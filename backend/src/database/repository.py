from typing import List, Optional

from fastapi import Depends
from sqlalchemy import select, delete
from sqlalchemy.orm import Session

from database.connection import get_db
from database.orm import (
    Information,
    History,
    BusinessClient,
    CompanyVisionValues,
    BusinessArea,
    Download
)


class InformationRepository:
    def __init__(self, session: Session = Depends(get_db)):
        self.session = session

    def get_information(self) -> List[Information]:
        return list(
            self.session.scalars(
                select(Information).order_by(Information.information_id)
            )
        )

    def get_information_by_id(self, id: int) -> Information:
        return self.session.scalar(
            select(Information).where(Information.information_id == id)
        )

    def create_information(self, information: Information) -> Information:
        self.session.add(information)
        self.session.commit()
        self.session.refresh(information)
        return information

    def update_information(self, information: Information) -> Information:
        self.session.add(information)
        self.session.commit()
        self.session.refresh(information)
        return information

    def delete_information(self, id: int) -> None:
        self.session.execute(
            delete(Information).where(Information.information_id == id)
        )
        self.session.commit()


class HistoryRepository:
    def __init__(self, session: Session = Depends(get_db)):
        self.session = session

    def get_history(self) -> List[History]:
        return list(
            self.session.scalars(
                select(History).order_by(History.history_date, History.history_id)
            )
        )

    def get_history_by_section_code(self, section_code: int) -> List[History]:
        return list(
            self.session.scalars(
                select(History)
                .where(History.history_section_code == section_code)
                .order_by(History.history_date, History.history_id)
            )
        )

    def get_history_by_id(self, id: int) -> History:
        return self.session.scalar(
            select(History).where(History.history_id == id)
        )

    def create_history(self, history: History) -> History:
        self.session.add(history)
        self.session.commit()
        self.session.refresh(history)
        return history

    def update_history(self, history: History) -> History:
        self.session.add(history)
        self.session.commit()
        self.session.refresh(history)
        return history

    def delete_history(self, id: int) -> None:
        self.session.execute(
            delete(History).where(History.history_id == id)
        )
        self.session.commit()


class BusinessClientRepository:
    def __init__(self, session: Session = Depends(get_db)):
        self.session = session

    def get_business_client(self) -> List[BusinessClient]:
        return list(
            self.session.scalars(
                select(BusinessClient).order_by(BusinessClient.client_id)
            )
        )

    def get_business_client_by_id(self, id: int) -> BusinessClient:
        return self.session.scalar(
            select(BusinessClient).where(BusinessClient.client_id == id)
        )

    def create_business_client(self, businessClient: BusinessClient) -> BusinessClient:
        self.session.add(businessClient)
        self.session.commit()
        self.session.refresh(businessClient)
        return businessClient

    def update_business_client(self, businessClient: BusinessClient) -> BusinessClient:
        self.session.add(businessClient)
        self.session.commit()
        self.session.refresh(businessClient)
        return businessClient

    def delete_business_client(self, id: int) -> None:
        self.session.execute(
            delete(BusinessClient).where(BusinessClient.client_id == id)
        )
        self.session.commit()


class CompanyVisionValuesRepository:
    def __init__(self, session: Session = Depends(get_db)):
        self.session = session

    def get_company_vision_values(self) -> List[CompanyVisionValues]:
        return list(
            self.session.scalars(
                select(CompanyVisionValues).order_by(CompanyVisionValues.vv_id)
            )
        )

    def get_company_vision_values_by_id(self, id: int) -> CompanyVisionValues:
        return self.session.scalar(
            select(CompanyVisionValues).where(CompanyVisionValues.vv_id == id)
        )

    def create_company_vision_values(self, companyVisionValues: CompanyVisionValues) -> CompanyVisionValues:
        self.session.add(companyVisionValues)
        self.session.commit()
        self.session.refresh(companyVisionValues)
        return companyVisionValues

    def update_company_vision_values(self, companyVisionValues: CompanyVisionValues) -> CompanyVisionValues:
        self.session.add(companyVisionValues)
        self.session.commit()
        self.session.refresh(companyVisionValues)
        return companyVisionValues

    def delete_company_vision_values(self, id: int) -> None:
        self.session.execute(
            delete(CompanyVisionValues).where(CompanyVisionValues.vv_id == id)
        )
        self.session.commit()


class BusinessAreaRepository:
    def __init__(self, session: Session = Depends(get_db)):
        self.session = session

    def get_business_area(self) -> List[BusinessArea]:
        return list(
            self.session.scalars(
                select(BusinessArea).order_by(BusinessArea.area_id)
            )
        )

    def get_business_area_by_id(self, id: int) -> BusinessArea:
        return self.session.scalar(
            select(BusinessArea).where(BusinessArea.area_id == id)
        )

    def create_business_area(self, businessArea: BusinessArea) -> BusinessArea:
        self.session.add(businessArea)
        self.session.commit()
        self.session.refresh(businessArea)
        return businessArea

    def update_business_area(self, businessArea: BusinessArea) -> BusinessArea:
        self.session.add(businessArea)
        self.session.commit()
        self.session.refresh(businessArea)
        return businessArea

    def delete_business_area(self, id: int) -> None:
        self.session.execute(
            delete(BusinessArea).where(BusinessArea.area_id == id)
        )
        self.session.commit()


class DownloadRepository:
    def __init__(self, session: Session = Depends(get_db)):
        self.session = session

    def get_by_code(self, download_code: int) -> Optional[Download]:
        return self.session.query(Download).filter_by(download_code=download_code).first()
