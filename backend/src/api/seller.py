from pathlib import Path
from typing import List, Annotated

from fastapi import APIRouter, Depends, HTTPException, Form, UploadFile, File

from database.orm import Seller
from database.repository import SellerRepository
from schema.request import CreateSellerRequest
from schema.response import SellerListSchema, SellerSchema, UpdateSellerSchema

router = APIRouter(prefix="/seller")

SELLER_DIR = Path("static/seller/")
SELLER_DIR.mkdir(parents=True, exist_ok=True) # 폴더 생성 코드

@router.get("", status_code=200)
def get_seller(
        seller_repo: SellerRepository = Depends()
) -> SellerListSchema:

    sellers : List[Seller] = seller_repo.get_seller()

    return SellerListSchema(
        sellers=[
            SellerSchema.model_validate(seller) for seller in sellers
        ]
    )

@router.get("/{seller_id}", status_code=200)
def get_seller(
        seller_id: int,
        seller_repo: SellerRepository = Depends()
) -> SellerSchema:

    seller : Seller = seller_repo.get_seller_by_id(seller_id)

    if seller:
        return SellerSchema.model_validate(seller)

    raise HTTPException(status_code=404, detail="Seller Not Found")

@router.post("", status_code=201)
def create_seller(
        request: Annotated[CreateSellerRequest, Depends(CreateSellerRequest.as_form)],
        seller_file: Annotated[UploadFile | None, File()] = None,
        seller_repo: SellerRepository = Depends()
):
    seller: Seller = Seller.create(request=request)

    if seller_file:
        file_name = seller_file.filename
        file_path = SELLER_DIR / file_name
        saved_path = str(file_path).replace("\\","/")

        # 파일 저장 처리
        with file_path.open("wb") as buffer:
            buffer.write(seller_file.file.read())

        # try: # -> 혹시 오류 발생 가능성도 있으니까 try - except 블록으로 감싸는거 고려 해보기
        #     with file_path.open("wb") as buffer:
        #         buffer.write(seller_file.file.read())
        # except Exception as e:
        #     raise HTTPException(status_code=500, detail="파일 저장 중 오류 발생")

        seller.seller_file_name = seller_file.filename
        seller.seller_file_path = saved_path

    seller: Seller = seller_repo.create_seller(seller=seller)

    return SellerSchema.model_validate(seller)

@router.patch("/{seller_id}", status_code=200)
def update_seller(
        seller_id: int,
        request: Annotated[UpdateSellerSchema, Depends(UpdateSellerSchema.as_form)],
        delete_file: bool = Form(False),
        seller_file: Annotated[UploadFile | None, File()] = None,
        seller_repo: SellerRepository = Depends()
):

    seller: Seller | None = seller_repo.get_seller_by_id(seller_id)

    if not seller:
        raise HTTPException(status_code=404, detail="Seller Not Found")

    if request.seller_name is not None:
        seller.seller_name = request.seller_name

    if request.seller_content is not None:
        seller.seller_content = request.seller_content

    # 기존 파일 삭제 여부 체크 시 파일 삭제
    if delete_file and seller.seller_file_path:
        file_to_delete = Path(seller.seller_file_path)
        if file_to_delete.exists():
            file_to_delete.unlink()
        seller.seller_file_path = None
        seller.seller_file_name = None

    # 새로운 파일 업로드 요청
    if seller_file and seller_file.filename:

        # 기존 파일 삭제
        if seller.seller_file_path:
            old_file = Path(seller.seller_file_path)
            if old_file.exists():
                old_file.unlink()

        file_name = seller_file.filename
        file_path = SELLER_DIR / file_name
        saved_path = str(file_path).replace("\\","/")

        with file_path.open("wb") as buffer:
            buffer.write(seller_file.file.read())

        # try: # -> 혹시 오류 발생 가능성도 있으니까 try - except 블록으로 감싸는거 고려 해보기
        #     with file_path.open("wb") as buffer:
        #         buffer.write(seller_file.file.read())
        # except Exception as e:
        #     raise HTTPException(status_code=500, detail="파일 저장 중 오류 발생")

        seller.seller_file_name = file_name
        seller.seller_file_path = saved_path

    seller: Seller = seller_repo.update_seller(seller=seller)

    return SellerSchema.model_validate(seller)

@router.delete("/{seller_id}", status_code=204)
def delete_seller(
        seller_id: int,
        seller_repo: SellerRepository = Depends()
):
    seller: Seller = seller_repo.get_seller_by_id(seller_id)

    if not seller:
        raise HTTPException(status_code=404, detail="Seller Not Found")

    # 파일이 존재한다면 삭제
    if seller.seller_file_path:
        file_to_delete = Path(seller.seller_file_path)

        if file_to_delete.exists():
            file_to_delete.unlink()

    seller_repo.delete_seller(seller_id)
