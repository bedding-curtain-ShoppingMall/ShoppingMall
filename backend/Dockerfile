# Python 3.11 베이스 이미지 사용
FROM python:3.11-slim

# 작업 디렉토리 설정
WORKDIR /app

# requirements.txt 복사 및 의존성 설치
COPY src/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# 소스 코드 복사
COPY src /app

# PYTHONPATH 설정 (src 디렉토리를 포함)
ENV PYTHONPATH=/app/src

# FastAPI 서버 실행
CMD ["uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "8080"]

