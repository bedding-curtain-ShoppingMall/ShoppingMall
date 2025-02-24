from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from api import information, history, business_client, company_vision_values, business_area, inquiry, login ,download

app = FastAPI()

# 모든 도메인에 대해 CORS 허용
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # ["http://example.com"] 처럼 특정 도메인만 허용 가능
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["Content-Disposition"]
)

# 정적 파일 제공 경로 설정
app.mount("/api/logos", StaticFiles(directory="logos"), name="logos")

app.include_router(information.router, prefix="/api")
app.include_router(history.router, prefix="/api")
app.include_router(business_client.router, prefix="/api")
app.include_router(company_vision_values.router, prefix="/api")
app.include_router(business_area.router, prefix="/api")
app.include_router(inquiry.router, prefix="/api")
app.include_router(login.router, prefix="/api")
app.include_router(download.router, prefix="/api")

def checking():
    return {"connect" : "success"}
