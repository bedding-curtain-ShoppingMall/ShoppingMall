from sqlalchemy import Column, Integer, String, Date, JSON
from sqlalchemy.orm import declarative_base

from schema.request import CreateInfoRequest, CreateHistoryRequest, CreateCompanyVisionValuesRequest, CreateBusinessAreaRequest

Base = declarative_base()

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
