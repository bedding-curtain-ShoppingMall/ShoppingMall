from sqlalchemy import Column, Integer, String, Date, DateTime, JSON, ForeignKey
from sqlalchemy.orm import declarative_base, relationship

from schema.request import CreateInfoRequest, CreateHistoryRequest, CreateCompanyVisionValuesRequest, \
    CreateBusinessAreaRequest, CreateMemberRequest, CreateCategoryRequest, CreateSellerRequest, CreateProductRequest, \
    CreateProductImgRequest
from utils.auth import get_password_hash

Base = declarative_base()

class Member(Base):
    __tablename__ = "member"

    member_id = Column(Integer, primary_key=True, autoincrement=True, nullable=False) # 기본키
    member_name = Column(String(100)) # 사용자 이름
    member_accounts = Column(String(100))
    member_password = Column(String(200))
    member_grade = Column(String(20))

    def __repr__(self):
        return (f"Member(id={self.member_id}, "
                f"name={self.member_name}, "
                f"accounts={self.member_accounts}, "
                f"grade={self.member_grade})")

    @classmethod
    def create(cls, request: CreateMemberRequest):
        # 비밀번호 해싱 작업
        hashed_password = get_password_hash(request.member_password)
        return cls(
            member_name=request.member_name,
            member_accounts=request.member_accounts,
            member_password=hashed_password,
            member_grade=getattr(request, "member_grade", None) or "user"  # user 외 다른 등급(admin) 테스트 시 코드 필요
            # member_grade="user"
        )

class Category(Base):
    __tablename__ = "category"

    category_id = Column(Integer, primary_key=True, autoincrement=True, nullable=False)
    category_large = Column(String(50), nullable=False)
    category_among = Column(String(50))
    category_cow = Column(String(50))

    def __repr__(self):
        return (f"Category(id={self.category_id}, "
                f"large={self.category_large}, "
                f"among={self.category_among}, "
                f"cow={self.category_cow})")

    @classmethod
    def create(cls, request: CreateCategoryRequest):
        return cls(
            category_large=request.category_large,
            category_among=request.category_among,
            category_cow=request.category_cow
        )

class Product(Base):
    __tablename__ = "product"

    product_id = Column(Integer, primary_key=True, autoincrement=True, nullable=False)
    product_name = Column(String(300))
    product_code = Column(String(50))
    product_option = Column(String(300))
    product_content = Column(String(1000))
    product_sale = Column(String(100))
    product_info_name = Column(String(300))
    product_info_path = Column(String(300))
    product_registration = Column(DateTime)
    product_edit = Column(DateTime)
    category_id = Column(Integer, ForeignKey("category.category_id"), nullable=False)

    # 관계 설정 (선택사항)
    category = relationship("Category", backref="products")

    def __repr__(self):
        return (f"Product(id={self.product_id}, "
                f"name={self.product_name}, "
                f"code={self.product_code}, "
                f"option={self.product_option}, "
                f"content={self.product_content}, "
                f"sale={self.product_sale}), "
                f"info_name={self.product_info_name}, "
                f"info_path={self.product_info_path}, "
                f"registration={self.product_registration}, "
                f"edit={self.product_edit})"
                f"category_id={self.category_id})")

    @classmethod
    def create(cls, request: CreateProductRequest):
        return cls(
            product_name=request.product_name,
            product_code=request.product_code,
            product_option=request.product_option,
            product_content=request.product_content,
            product_sale=request.product_sale,
            product_registration=request.product_registration,
            product_edit=request.product_edit,
            category_id=request.category_id
        )

class ProductImg(Base):
    __tablename__ = "product_image"

    img_id = Column(Integer, primary_key=True, autoincrement=True, nullable=False)
    img_featured_name = Column(String(300))
    img_featured_path = Column(String(300))
    img1_name = Column(String(300))
    img1_path = Column(String(300))
    img2_name = Column(String(300))
    img2_path = Column(String(300))
    img3_name = Column(String(300))
    img3_path = Column(String(300))
    img4_name = Column(String(300))
    img4_path = Column(String(300))
    img5_name = Column(String(300))
    img5_path = Column(String(300))
    product_id = Column(Integer, ForeignKey("product.product_id"), nullable=False)

    # 관계 설정
    product = relationship("Product", backref="images")

    def __repr__(self):
        return (f"ProductImage(id={self.img_id}, product_id={self.product_id}, "
                f"featured_name={self.img_featured_name}, featured_path={self.img_featured_path}, "
                f"img1=({self.img1_name}, {self.img1_path}), "
                f"img2=({self.img2_name}, {self.img2_path}), "
                f"img3=({self.img3_name}, {self.img3_path}), "
                f"img4=({self.img4_name}, {self.img4_path}), "
                f"img5=({self.img5_name}, {self.img5_path}))")

    @classmethod
    def create(cls, request: CreateProductImgRequest):
        return cls(
            product_id=request.product_id
        )

class Seller(Base):
    __tablename__ = "seller_info"

    seller_id = Column(Integer, primary_key=True, autoincrement=True, nullable=False)
    seller_name = Column(String(1000))
    seller_content = Column(String(1000))
    seller_file_name = Column(String(1000))
    seller_file_path = Column(String(1000))

    def __repr__(self):
        return (f"SellerInfo(id={self.seller_id}, "
                f"name={self.seller_name}, "
                f"content={self.seller_content}, "
                f"file_name={self.seller_file_name}, "
                f"file_path={self.seller_file_path})")

    @classmethod
    def create(cls, request: CreateSellerRequest):
        return cls(
            seller_name=request.seller_name,
            seller_content=request.seller_content
        )

# --------------------
# --------------------
# ace it
class Information(Base):
    __tablename__ = "information"

    information_id = Column(Integer, primary_key=True, autoincrement=True)
    information_name = Column(String(255), nullable=False)
    information_content = Column(String(5000))

    def __repr__(self):
        return (f"Information(id={self.information_id}, "
                f"name={self.information_name}, "
                f"content={self.information_content})")

    @classmethod
    def create(cls, request: CreateInfoRequest):
        return cls(
            information_name= request.information_name,
            information_content=request.information_content
        )


class History(Base):
    __tablename__ = "history"

    history_id = Column(Integer, primary_key=True, autoincrement=True)
    history_section_code = Column(Integer, nullable=False)
    history_date = Column(Date, nullable=False)
    history_content = Column(String(2000), nullable=False)

    def __repr__(self):
        return (f"History(id={self.history_id}, "
                f"section_code={self.history_section_code}, "
                f"date={self.history_date}, "
                f"content={self.history_content})")

    @classmethod
    def create(cls, request: CreateHistoryRequest):
        return cls(
            history_section_code=request.history_section_code,
            history_date=request.history_date,
            history_content=request.history_content
        )


class BusinessClient(Base):
    __tablename__ = "business_client"

    client_id = Column(Integer, primary_key=True, autoincrement=True)
    client_name = Column(String(255), nullable=False)
    client_logo_name = Column(String(1000))
    client_logo_path = Column(String(1000))

    def __repr__(self):
        return (f"BusinessClient(id={self.client_id}, "
                f"name={self.client_name}, "
                f"logo_name={self.client_logo_name}, "
                f"logo_path={self.client_logo_path})")

    @classmethod
    def create(cls, client_name: str):
        return cls(
            client_name=client_name
        )


class CompanyVisionValues(Base):
    __tablename__ = "company_vision_values"

    vv_id = Column(Integer, primary_key=True, autoincrement=True)
    vv_name = Column(String(255), nullable=False)
    vv_content = Column(String(3000))
    vv_details = Column(JSON)

    def __repr__(self):
        return (f"CompanyVisionValues(id={self.vv_id}, "
                f"content={self.vv_content}, "
                f"content={self.vv_content}, "
                f"detail={self.vv_details})")

    @classmethod
    def create(cls, request: CreateCompanyVisionValuesRequest):
        return cls(
            vv_name=request.vv_name,
            vv_content=request.vv_content,
            vv_details=request.vv_details
        )


class BusinessArea(Base):
    __tablename__ = "business_area"

    area_id = Column(Integer, primary_key=True, autoincrement=True)
    area_name = Column(String(255), nullable=False)
    area_type = Column(JSON)
    area_content = Column(String(3000))
    area_details = Column(JSON)

    def __repr__(self):
        return (f"BusinessArea(id={self.area_id}, "
                f"name={self.area_name}, "
                f"type={self.area_type}, "
                f"content={self.area_content}, "
                f"details={self.area_details})")

    @classmethod
    def create(cls, request: CreateBusinessAreaRequest):
        return cls(
            area_name=request.area_name,
            area_type=request.area_type,
            area_content=request.area_content,
            area_details=request.area_details
        )

class Download(Base):
    __tablename__ = "download"

    download_id = Column(Integer, primary_key=True, autoincrement=True)
    download_code = Column(Integer, nullable=False)
    download_name = Column(String, nullable=True)
    file_name = Column(String(255), nullable=False)
    file_path = Column(String(1000), nullable=False)
    exam_image = Column(String, nullable=True)

    def __repr__(self):
        return (f"Download(id={self.download_id}, "
                f"code={self.download_code}, "
                f"dowload_name={self.download_name}, "
                f"file_name={self.file_name}, "
                f"path={self.file_path}, "
                f"exam_image={self.exam_image}, ")
