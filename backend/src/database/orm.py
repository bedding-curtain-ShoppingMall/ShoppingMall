from sqlalchemy import Column, Integer, String, Date, DateTime, JSON, ForeignKey
from sqlalchemy.orm import declarative_base, relationship

from schema.request import CreateInfoRequest, CreateHistoryRequest, CreateCompanyVisionValuesRequest, CreateBusinessAreaRequest

Base = declarative_base()

class Member(Base):
    __tablename__ = "member"

    member_id = Column(Integer, primary_key=True, nullable=False)
    member_name = Column(String(20))
    member_accounts = Column(String(20))
    member_password = Column(String(30))
    member_grade = Column(String(20))

    def __repr__(self):
        return (f"Member(id={self.member_id}, "
                f"name={self.member_name}, "
                f"accounts={self.member_accounts}, "
                f"grade={self.member_grade})")

class Category(Base):
    __tablename__ = "category"

    category_id = Column(Integer, primary_key=True, nullable=False)
    category_large = Column(String(50), nullable=False)
    category_among = Column(String(50))
    category_cow = Column(String(50))

    def __repr__(self):
        return (f"Category(id={self.category_id}, "
                f"large={self.category_large}, "
                f"among={self.category_among}, "
                f"cow={self.category_cow})")

class Product(Base):
    __tablename__ = "product"

    product_id = Column(Integer, primary_key=True, nullable=False)
    product_name = Column(String(300))
    product_code = Column(String(50))
    product_option = Column(String(300))
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
                f"category_id={self.category_id})")

class ProductImage(Base):
    __tablename__ = "product_image"

    image_id = Column(Integer, primary_key=True, nullable=False)
    image_featured_name = Column(String(300))
    image_featured_path = Column(String(300))
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
    img6_name = Column(String(300))
    img6_path = Column(String(300))
    product_id = Column(Integer, ForeignKey("product.product_id"), nullable=False)

    # 관계 설정
    product = relationship("Product", backref="images")

    def __repr__(self):
        return (f"ProductImage(id={self.image_id}, product_id={self.product_id}, "
                f"featured_name={self.image_featured_name}, featured_path={self.image_featured_path}, "
                f"img1=({self.img1_name}, {self.img1_path}), "
                f"img2=({self.img2_name}, {self.img2_path}), "
                f"img3=({self.img3_name}, {self.img3_path}), "
                f"img4=({self.img4_name}, {self.img4_path}), "
                f"img5=({self.img5_name}, {self.img5_path}), "
                f"img6=({self.img6_name}, {self.img6_path}))")

class SellerInfo(Base):
    __tablename__ = "seller_info"

    seller_id = Column(Integer, primary_key=True, nullable=False)
    seller_name = Column(String(300))
    seller_business_num = Column(String(50))
    seller_address = Column(String(300))
    seller_call_num = Column(String(50))

    def __repr__(self):
        return (f"SellerInfo(id={self.seller_id}, "
                f"name={self.seller_name}, "
                f"business_num={self.seller_business_num}, "
                f"call_num={self.seller_call_num})")

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
