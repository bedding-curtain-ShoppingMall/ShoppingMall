from datetime import date
from typing import List, Optional, Dict

from pydantic import BaseModel, ConfigDict


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
