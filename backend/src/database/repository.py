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
    Download,
    Member, Category, Product, ProductImage, SellerInfo
)


# --------------------
# Member
# --------------------

class MemberRepository:
    def __init__(self, session: Session = Depends(get_db)):
        self.session = session

    def get_member(self) -> List[Member]:
        return list(
            self.session.scalars(
                select(Member).order_by(Member.member_id)
            )
        )

    def get_member_by_id(self, id: int) -> Member:
        return self.session.scalar(
            select(Member).where(Member.member_id == id)
        )

    def get_member_by_accounts(self, accounts: str) -> Member | None:
        return self.session.scalar(
            select(Member).where(Member.member_accounts == accounts)
        )

    def create_member(self, member: Member) -> Member:
        self.session.add(member)
        self.session.commit()
        self.session.refresh(member)
        return member

    def update_member(self, member: Member) -> Member:
        self.session.add(member)
        self.session.commit()
        self.session.refresh(member)
        return member

    def delete_member(self, id: int) -> None:
        self.session.execute(
            delete(Member).where(Member.member_id == id)
        )
        self.session.commit()

# --------------------
# Category
# --------------------

class CategoryRepository:
    def __init__(self, session: Session = Depends(get_db)):
        self.session = session

    def get_category(self) -> List[Category]:
        return list(
            self.session.scalars(
                select(Category).order_by(Category.category_id)
            )
        )

    def get_category_by_id(self, id: int) -> Category:
        return self.session.scalar(
            select(Category).where(Category.category_id == id)
        )

    def create_category(self, category: Category) -> Category:
        self.session.add(category)
        self.session.commit()
        self.session.refresh(category)
        return category

    def update_category(self, category: Category) -> Category:
        self.session.add(category)
        self.session.commit()
        self.session.refresh(category)
        return category

    def delete_category(self, id: int) -> None:
        self.session.execute(
            delete(Category).where(Category.category_id == id)
        )
        self.session.commit()

# --------------------
# Product
# --------------------

class ProductRepository:
    def __init__(self, session: Session = Depends(get_db)):
        self.session = session

    def get_product(self) -> List[Product]:
        return list(
            self.session.scalars(
                select(Product).order_by(Product.product_id)
            )
        )

    def get_product_by_id(self, id: int) -> Product:
        return self.session.scalar(
            select(Product).where(Product.product_id == id)
        )

    def create_product(self, product: Product) -> Product:
        self.session.add(product)
        self.session.commit()
        self.session.refresh(product)
        return product

    def update_product(self, product: Product) -> Product:
        self.session.add(product)
        self.session.commit()
        self.session.refresh(product)
        return product

    def delete_product(self, id: int) -> None:
        self.session.execute(
            delete(Product).where(Product.product_id == id)
        )
        self.session.commit()

# --------------------
# ProductImage
# --------------------

class ProductImageRepository:
    def __init__(self, session: Session = Depends(get_db)):
        self.session = session

    def get_image(self) -> List[ProductImage]:
        return list(
            self.session.scalars(
                select(ProductImage).order_by(ProductImage.image_id)
            )
        )

    def get_image_by_id(self, id: int) -> ProductImage:
        return self.session.scalar(
            select(ProductImage).where(ProductImage.image_id == id)
        )

    def create_image(self, image: ProductImage) -> ProductImage:
        self.session.add(image)
        self.session.commit()
        self.session.refresh(image)
        return image

    def update_image(self, image: ProductImage) -> ProductImage:
        self.session.add(image)
        self.session.commit()
        self.session.refresh(image)
        return image

    def delete_image(self, id: int) -> None:
        self.session.execute(
            delete(ProductImage).where(ProductImage.image_id == id)
        )
        self.session.commit()

# --------------------
# SellerInfo
# --------------------

class SellerInfoRepository:
    def __init__(self, session: Session = Depends(get_db)):
        self.session = session

    def get_seller(self) -> List[SellerInfo]:
        return list(
            self.session.scalars(
                select(SellerInfo).order_by(SellerInfo.seller_id)
            )
        )

    def get_seller_by_id(self, id: int) -> SellerInfo:
        return self.session.scalar(
            select(SellerInfo).where(SellerInfo.seller_id == id)
        )

    def create_seller(self, seller: SellerInfo) -> SellerInfo:
        self.session.add(seller)
        self.session.commit()
        self.session.refresh(seller)
        return seller

    def update_seller(self, seller: SellerInfo) -> SellerInfo:
        self.session.add(seller)
        self.session.commit()
        self.session.refresh(seller)
        return seller

    def delete_seller(self, id: int) -> None:
        self.session.execute(
            delete(SellerInfo).where(SellerInfo.seller_id == id)
        )
        self.session.commit()

# --------------------
# --------------------
# ace it
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
