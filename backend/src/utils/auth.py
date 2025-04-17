import os
from datetime import datetime, timedelta
from passlib.context import CryptContext
import jwt

# -----------------------------
# 1. JWT 관련 설정값 (env 파일 설정 값 가져오기)
# -----------------------------
SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# -----------------------------
# 2. 비밀번호 해싱/검증 설정
# -----------------------------

# 비밓번호 해싱 작업 코드
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_password_hash(password: str) -> str:
    return pwd_context.hash(password) # 비밀번호를 해싱으로 변화하여 반환

def verify_password(request_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(request_password, hashed_password) # 사용자가 입력한 비밀번호와 db값을 비교하여 반환

# -----------------------------
# 3. JWT 액세스 토큰 생성 함수
# -----------------------------

def create_access_token(data: dict, expires_delta: timedelta | None = None) -> str:

    # data(페이로드) + 만료시간(exp)을 담은 JWT 액세스 토큰을 생성하여 반환
    to_encode = data.copy()

    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)

    to_encode.update({"exp": expire})

    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt
