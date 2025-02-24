# Node.js 베이스 이미지 사용
FROM node:18-alpine AS build

# 작업 디렉토리 설정
WORKDIR /app

# package.json 및 package-lock.json 복사
COPY front/package.json front/package-lock.json ./

# 의존성 설치
RUN npm install

# 전체 프로젝트 파일 복사
COPY front /app

# 애플리케이션 빌드
RUN npm run build

# 빌드 결과물은 /app/build 또는 /app/dist에 생성됩니다

