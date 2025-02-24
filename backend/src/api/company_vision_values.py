from typing import List

from fastapi import Depends, APIRouter, HTTPException

from database.orm import CompanyVisionValues
from database.repository import CompanyVisionValuesRepository
from schema.request import CreateCompanyVisionValuesRequest
from schema.response import CompanyVisionValuesListSchema, CompanyVisionValueSchema, UpdateCompanyVisionValueSchema

router = APIRouter(prefix="/companyVisionValues")

@router.get("", status_code=200)
def get_company_vision_values(
        vv_repo: CompanyVisionValuesRepository = Depends()
) -> CompanyVisionValuesListSchema:
    company_vision_values: List[CompanyVisionValues] = vv_repo.get_company_vision_values()

    return CompanyVisionValuesListSchema(
        company_vision_values=[
            CompanyVisionValueSchema.model_validate(company_vision_value.__dict__)
            for company_vision_value in company_vision_values
        ]
    )


@router.get("/{vv_id}", status_code=200)
def get_company_vision_values(
        vv_id: int,
        vv_repo: CompanyVisionValuesRepository = Depends()
) -> CompanyVisionValueSchema:
    company_vision_value: CompanyVisionValues = vv_repo.get_company_vision_values_by_id(vv_id)

    if company_vision_value:
        return CompanyVisionValueSchema.model_validate(company_vision_value.__dict__)

    raise HTTPException(status_code=404, detail="CompanyVisionValues Not Found")

@router.post("", status_code=201)
def create_company_vision_values(
        request: CreateCompanyVisionValuesRequest,
        vv_repo: CompanyVisionValuesRepository = Depends()
):
    company_vision_value: CompanyVisionValues = CompanyVisionValues.create(request=request)
    company_vision_value: CompanyVisionValues = vv_repo.create_company_vision_values(companyVisionValues=company_vision_value)

    return CompanyVisionValueSchema.model_validate(company_vision_value.__dict__)

@router.patch("/{vv_id}", status_code=200)
def update_company_vision_values(
        vv_id: int,
        request: UpdateCompanyVisionValueSchema,
        vv_repo: CompanyVisionValuesRepository = Depends()
):

    company_vision_values: CompanyVisionValues | None = vv_repo.get_company_vision_values_by_id(vv_id)

    if company_vision_values:

        company_vision_values.vv_name = request.vv_name
        company_vision_values.vv_content = request.vv_content
        company_vision_values.vv_details = request.vv_details

        update_company_vision_values : CompanyVisionValues = vv_repo.update_company_vision_values(companyVisionValues=company_vision_values)

        return CompanyVisionValueSchema.model_validate(update_company_vision_values.__dict__)

    raise HTTPException(status_code=404, detail="CompanyVisionValues Not Found")

@router.delete("/{vv_id}", status_code=204)
def delete_company_vision_values(
        vv_id: int,
        vv_repo: CompanyVisionValuesRepository = Depends()
):
    company_vision_values: CompanyVisionValues | None = vv_repo.get_company_vision_values_by_id(vv_id)

    if not company_vision_values:
        raise HTTPException(status_code=404, detail="CompanyVisionValues Not Found")

    vv_repo.delete_company_vision_values(vv_id)
