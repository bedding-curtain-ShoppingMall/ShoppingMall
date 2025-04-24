from datetime import date, datetime
from typing import List, Optional, Dict, Annotated

from fastapi import Form
from pydantic import BaseModel, ConfigDict

# --------------------
# Member
# --------------------

class MemberSchema(BaseModel):
    member_id: int
    member_name: Optional[str] = None
    member_accounts: Optional[str] = None
    member_password: Optional[str] = None
    member_grade: Optional[str] = None

    model_config = ConfigDict(from_attributes=True)

class MemberListSchema(BaseModel):
    members: List[MemberSchema]

class UpdateMemberSchema(BaseModel):
    member_name: Optional[str] = None
    member_accounts: Optional[str] = None
    member_password: Optional[str] = None
    member_grade: Optional[str] = None

    model_config = ConfigDict(from_attributes=True)

# --------------------
# Category
# --------------------
class CategorySchema(BaseModel):
    category_id: int
    category_large: str
    category_among: str | None = None
    category_cow: str | None = None

    model_config = ConfigDict(from_attributes=True)

class CategoryListSchema(BaseModel):
    categories: List[CategorySchema]

class UpdateCategorySchema(BaseModel):
    category_large: str | None = None
    category_among: str | None = None
    category_cow: str | None = None

    model_config = ConfigDict(from_attributes=True)

# --------------------
# Product
# --------------------
class ProductSchema(BaseModel):
    product_id: int
    product_name: str | None = None
    product_code: str | None = None
    product_option: str | None = None
    product_content: str | None = None
    product_sale: str | None = None
    product_info_name: str | None = None
    product_info_path: str | None = None
    product_registration: datetime | None = None
    product_edit: datetime | None = None
    category_id: int

    model_config = ConfigDict(from_attributes=True)

class ProductListSchema(BaseModel):
    products: List[ProductSchema]

class UpdateProductSchema(BaseModel):
    product_name: str | None = None
    product_code: str | None = None
    product_option: str | None = None
    product_content: str | None = None
    product_sale: str | None = None
    product_info_name: str | None = None
    product_info_path: str | None = None
    product_edit: datetime | None = None
    category_id: int | None = None

    model_config = ConfigDict(from_attributes=True)

    @classmethod  # fastAPI가 Form 데이터로도 UpdateProductSchema를 사용할 수 있도록 해주는 메서드
    def as_form(
            cls,
            category_id: Annotated[int, Form()],
            product_name: Annotated[str | None, Form()] = None,
            product_code: Annotated[str | None, Form()] = None,
            product_option: Annotated[str | None, Form()] = None,
            product_content: Annotated[str | None, Form()] = None,
            product_sale: Annotated[str | None, Form()] = None,
            product_edit=datetime.utcnow()
    ):
        return cls(
            product_name=product_name,
            product_code=product_code,
            product_option=product_option,
            product_content=product_content,
            product_sale=product_sale,
            product_edit=product_edit,
            category_id=category_id
        )

# --------------------
# ProductImage
# --------------------
class ProductImgSchema(BaseModel):
    img_id: int
    img_featured_name: str | None = None
    img_featured_path: str | None = None
    img1_name: str | None = None
    img1_path: str | None = None
    img2_name: str | None = None
    img2_path: str | None = None
    img3_name: str | None = None
    img3_path: str | None = None
    img4_name: str | None = None
    img4_path: str | None = None
    img5_name: str | None = None
    img5_path: str | None = None
    product_id: int

    model_config = ConfigDict(from_attributes=True)

class ProductImgListSchema(BaseModel):
    all_img: List[ProductImgSchema]

class UpdateProductImgSchema(BaseModel):
    img_featured_name: str | None = None
    img_featured_path: str | None = None
    img1_name: str | None = None
    img1_path: str | None = None
    img2_name: str | None = None
    img2_path: str | None = None
    img3_name: str | None = None
    img3_path: str | None = None
    img4_name: str | None = None
    img4_path: str | None = None
    img5_name: str | None = None
    img5_path: str | None = None
    product_id: int

    model_config = ConfigDict(from_attributes=True)

# --------------------
# Product & ProductImage
# --------------------
class ProductWithImgSchema(BaseModel):
    product: ProductSchema
    img: ProductImgSchema | None = None

    model_config = ConfigDict(from_attributes=True)

class ProductWithImgListSchema(BaseModel):
    products: List[ProductWithImgSchema] # products_and_all_img

# --------------------
# SellerInfo
# --------------------
class SellerSchema(BaseModel):
    seller_id: int
    seller_name: str | None = None
    seller_content: str | None = None
    seller_file_name: str | None = None
    seller_file_path: str | None = None

    model_config = ConfigDict(from_attributes=True)

class SellerListSchema(BaseModel):
    sellers: List[SellerSchema]

class UpdateSellerSchema(BaseModel):
    seller_name: str | None = None
    seller_content: str | None = None

    model_config = ConfigDict(from_attributes=True)

    @classmethod  # fastAPI가 Form 데이터로도 UpdateSellerSchema를 사용할 수 있도록 해주는 메서드
    def as_form(
            cls,
            seller_name: Annotated[str | None, Form()] = None,
            seller_content: Annotated[str | None, Form()] = None
    ):
        return cls(seller_name=seller_name, seller_content=seller_content)

# --------------------
# --------------------
# ace it
class InfoSchema(BaseModel):
    information_id: int
    information_name: str
    information_content: str

    model_config = ConfigDict(from_attributes=True)

class InfoListSchema(BaseModel):
    information: List[InfoSchema]

class UpdateInfoSchema(BaseModel):
    information_name: str
    information_content: str

    model_config = ConfigDict(from_attributes=True)


class HistorySchema(BaseModel):
    history_id: int
    history_section_code: int
    history_date: date
    history_content: str

    model_config = ConfigDict(from_attributes=True)

class HistoryListSchema(BaseModel):
    history: List[HistorySchema]

class UpdateHistorySchema(BaseModel):
    history_section_code: int
    history_date: date
    history_content: str

    model_config = ConfigDict(from_attributes=True)


class BusinessClientSchema(BaseModel):
    client_id: int
    client_name: str
    client_logo_name: Optional[str] = None
    client_logo_path: Optional[str] = None

    model_config = ConfigDict(from_attributes=True)

class BusinessClientListSchema(BaseModel):
    business_clients: List[BusinessClientSchema]

class UpdateBusinessClientSchema(BaseModel):
    client_name: str

    model_config = ConfigDict(from_attributes=True)


class CompanyVisionValueSchema(BaseModel):
    vv_id: int
    vv_name: str
    vv_content: Optional[str] = None
    vv_details: Optional[Dict] = None

    model_config = ConfigDict(from_attributes=True)

class CompanyVisionValuesListSchema(BaseModel):
    company_vision_values: List[CompanyVisionValueSchema]

class UpdateCompanyVisionValueSchema(BaseModel):
    vv_name: str
    vv_content: Optional[str] = None
    vv_details: Optional[Dict] = None

    model_config = ConfigDict(from_attributes=True)


class BusinessAreaSchema(BaseModel):
    area_id: int
    area_name: str
    area_type: Optional[Dict] = None
    area_content: Optional[str] = None
    area_details: Optional[Dict] = None

    model_config = ConfigDict(from_attributes=True)

class BusinessAreaListSchema(BaseModel):
    business_areas: List[BusinessAreaSchema]

class UpdateBusinessAreaSchema(BaseModel):
    area_name: str
    area_type: Optional[Dict] = None
    area_content: Optional[str] = None
    area_details: Optional[Dict] = None

    model_config = ConfigDict(from_attributes=True)

class DownloadSchema(BaseModel):
    download_id: int
    download_code: int
    file_name: str
    file_path: str

    model_config = ConfigDict(from_attributes=True)
