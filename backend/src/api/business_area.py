from typing import List

from fastapi import Depends, APIRouter, HTTPException

from database.orm import BusinessArea
from database.repository import BusinessAreaRepository
from schema.request import CreateBusinessAreaRequest
from schema.response import BusinessAreaListSchema, BusinessAreaSchema, UpdateBusinessAreaSchema

router = APIRouter(prefix="/businessArea")

@router.get("", status_code=200)
def get_business_area(
        area_repo : BusinessAreaRepository = Depends()
) -> BusinessAreaListSchema:
    business_areas: List[BusinessArea] = area_repo.get_business_area()

    return BusinessAreaListSchema(
        business_areas = [
            BusinessAreaSchema.model_validate(business_area.__dict__) for business_area in business_areas
        ]
    )

@router.get("/{area_id}", status_code=200)
def get_business_area(
        area_id: int,
        area_repo: BusinessAreaRepository = Depends()
) -> BusinessAreaSchema:
    business_area: BusinessArea = area_repo.get_business_area_by_id(area_id)

    if business_area:
        return BusinessAreaSchema.model_validate(business_area.__dict__)

    raise HTTPException(status_code=404, detail="BusinessArea Not Found")

@router.post("", status_code=201)
def create_business_area(
        request: CreateBusinessAreaRequest,
        area_repo : BusinessAreaRepository = Depends()
):

    business_area : BusinessArea = BusinessArea.create(request=request)
    business_area : BusinessArea = area_repo.create_business_area(businessArea=business_area)

    return BusinessAreaSchema.model_validate(business_area.__dict__)

@router.patch("/{area_id}", status_code=200)
def update_business_area(
        area_id : int,
        request : UpdateBusinessAreaSchema,
        area_repo : BusinessAreaRepository = Depends()
):

    business_area: BusinessArea | None = area_repo.get_business_area_by_id(area_id)

    if business_area:

        business_area.area_name = request.area_name
        business_area.area_type = request.area_type
        business_area.area_content = request.area_content
        business_area.area_details = request.area_details

        update_business_area : BusinessArea = area_repo.update_business_area(businessArea=business_area)

        return BusinessAreaSchema.model_validate(update_business_area.__dict__)

    raise HTTPException(status_code=404, detail="BusinessArea Not Found")

@router.delete("/{area_id}", status_code=204)
def delete_business_area(
        area_id : int,
        area_repo : BusinessAreaRepository = Depends()
):

    business_area : BusinessArea | None = area_repo.get_business_area_by_id(area_id)

    if not business_area:
        raise HTTPException(status_code=404, detail="BusinessArea Not Found")

    area_repo.delete_business_area(area_id)

