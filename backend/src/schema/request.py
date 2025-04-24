from datetime import date, datetime
from typing import Optional, Dict, Annotated

from Tools.scripts.abitype import classify
from fastapi import Form
from pydantic import BaseModel, EmailStr

# --------------------
# Member
# --------------------
class CreateMemberRequest(BaseModel):
    member_name: str
    member_accounts: str
    member_password: str
    # member_grade: Optional[str] = None # user 외 다른 등급(admin) 테스트 시 코드 필요

class LoginRequest(BaseModel):
    member_accounts: str
    member_password: str

# --------------------
# Category
# --------------------
class CreateCategoryRequest(BaseModel):
    category_large: str
    category_among: Optional[str] = None
    category_cow: Optional[str] = None

# --------------------
# Product
# --------------------
class CreateProductRequest(BaseModel):
    product_name: Optional[str] = None
    product_code: Optional[str] = None
    product_option: Optional[str] = None
    product_content: Optional[str] = None
    product_sale: Optional[str] = None
    product_info_name: Optional[str] = None
    product_info_path: Optional[str] = None
    product_registration: Optional[datetime] = None
    product_edit: Optional[datetime] = None
    category_id: int  # 필수값

    @classmethod # fastAPI가 Form 데이터로도 CreateProductRequest를 사용할 수 있도록 해주는 메서드
    def as_form(
            cls,
            product_name: Annotated[str | None, Form()] = None,
            product_code: Annotated[str | None, Form()] = None,
            product_option: Annotated[str | None, Form()] = None,
            product_content: Annotated[str | None, Form()] = None,
            product_sale: Annotated[str | None, Form()] = None,
            product_registration = datetime.utcnow(),
            product_edit = datetime.utcnow(),
            category_id: Annotated[int, Form()] = Form()
    ):
        return cls(
            product_name=product_name,
            product_code=product_code,
            product_option=product_option,
            product_content=product_content,
            product_sale=product_sale,
            product_registration=product_registration,
            product_edit=product_edit,
            category_id=category_id
        )

# --------------------
# ProductImage
# --------------------
class CreateProductImgRequest(BaseModel):
    img_featured_name: Optional[str] = None
    img_featured_path: Optional[str] = None
    img1_name: Optional[str] = None
    img1_path: Optional[str] = None
    img2_name: Optional[str] = None
    img2_path: Optional[str] = None
    img3_name: Optional[str] = None
    img3_path: Optional[str] = None
    img4_name: Optional[str] = None
    img4_path: Optional[str] = None
    img5_name: Optional[str] = None
    img5_path: Optional[str] = None
    product_id: int  # 필수값

# --------------------
# SellerInfo
# --------------------
class CreateSellerRequest(BaseModel):
    seller_name: Optional[str] = None
    seller_content: Optional[str] = None

    @classmethod # fastAPI가 Form 데이터로도 CreateSellerRequest를 사용할 수 있도록 해주는 메서드
    def as_form(
            cls, 
            seller_name: Annotated[str | None, Form()] = None,
            seller_content: Annotated[str | None, Form()] = None
    ):
        return cls(seller_name=seller_name, seller_content=seller_content)

# --------------------
# --------------------
# ace it
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
