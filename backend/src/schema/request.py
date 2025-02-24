from datetime import date
from typing import Optional, Dict

from pydantic import BaseModel, EmailStr


class CreateInfoRequest(BaseModel):
    information_name: str
    information_content: str


class CreateHistoryRequest(BaseModel):
    history_section_code: int
    history_date: date
    history_content: str


class CreateCompanyVisionValuesRequest(BaseModel):
    vv_name: str
    vv_content: Optional[str] = None
    vv_details: Optional[Dict] = None


class CreateBusinessAreaRequest(BaseModel):
    area_name: str
    area_type: Optional[Dict] = None
    area_content: Optional[str] = None
    area_details: Optional[Dict] = None


class CreateInquiryRequest(BaseModel):
    inquiry_writer: str # 문의 작성자
    inquiry_writer_email: Optional[str] = None # 문의 작성자 이메일 주소
    inquiry_writer_contact_number: Optional[str] = None # 문의 작성자 연락처
    inquiry_details: Optional[str] = None # 문의 내용

class EmailSchema(BaseModel):
    email: EmailStr = "genie9718@naver.com" # 받는사람 이메일
    subject: str = "ace it 문의"
    message: CreateInquiryRequest
