import os
import logging
from typing import Optional

from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session

from database.connection import get_db  # 세션을 반환하는 Depends 함수
from database.orm import Download

# 로거 설정 (필요하다면 별도 config나 포맷, 핸들러 등을 더 추가 가능)
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# 엔드포인트 라우터
router = APIRouter(prefix="/download")

# 현재 파일이 존재하는 디렉토리 기준, 다운로드 경로 설정
# __file__를 그대로 사용할 경우 경로가 꼬일 수 있으니 주의
# 예: BASE_DIR = os.path.join(os.path.dirname(__file__), "home", "homepage", "download")
BASE_DIR = os.path.normpath(os.path.join(__file__, "/home/homepage/download"))


@router.get("")
def get_downloads(db: Session = Depends(get_db)):
    """전체 다운로드 목록 조회"""
    logger.info("Called get_downloads endpoint.")
    data_list = db.query(Download).all()
    logger.info(f"Retrieved {len(data_list)} items from 'download' table.")
    return data_list


@router.get("/{download_code}")
def get_download_info(download_code: int, db: Session = Depends(get_db)):
    """단건 다운로드 메타정보 조회"""
    logger.info(f"Called get_download_info with download_code={download_code}")
    data: Optional[Download] = (
        db.query(Download)
        .filter(Download.download_code == download_code)
        .first()
    )
    if data is None:
        logger.warning(f"No download info found for download_code={download_code}")
        raise HTTPException(status_code=404, detail="Not Found")
    
    logger.info(f"Found download info: {data}")
    return {
        "download_id": data.download_id,
        "download_name": data.download_name,
        "file_name": data.file_name,
        "file_path": data.file_path,
        }


@router.get("/file/{download_id}")
def download_file(download_id: int, db: Session = Depends(get_db)):
    logger.info(f"Called download_file with download_id={download_id}")
    
    # 1) DB에서 메타데이터 조회
    data = db.query(Download).filter(Download.download_id == download_id).first()
    if data is None:
        logger.warning(f"File metadata not found in DB for download_id={download_id}")
        raise HTTPException(status_code=404, detail="File metadata not found")
    
    # 2) 실제 서버상의 파일 경로 확인
    file_path = os.path.join(BASE_DIR, data.file_name)
    logger.info(f"Constructed file_path={file_path} from BASE_DIR={BASE_DIR}")
    
    if not os.path.isfile(file_path):
        logger.warning(f"File does not exist on server: {file_path}")
        raise HTTPException(status_code=404, detail="File not found on server")
    
    # 3) 파일 응답
    logger.info(f"Returning file {file_path} to the client.")
    return FileResponse(
        path=file_path,
        filename=data.file_name,  # 다운로드될 때 보여줄 파일명
        
        media_type="application/pdf",  # 예: PDF 파일
        headers={
            "Access-Control-Expose-Headers": "Content-Disposition"
            }
        )


