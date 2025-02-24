from typing import List
from fastapi import Depends, APIRouter, HTTPException, Body

from database.orm import Information
from database.repository import InformationRepository
from schema.request import CreateInfoRequest
from schema.response import InfoListSchema, InfoSchema, UpdateInfoSchema

router = APIRouter(prefix="/information")

@router.get("", status_code=200)
def get_information(
        info_repo: InformationRepository = Depends()
) -> InfoListSchema:
    information: List[Information] = info_repo.get_information()

    return InfoListSchema(
        information=[
            InfoSchema.model_validate(info) for info in information
        ]
    )

@router.get("/{information_id}", status_code=200)
def get_information(
        information_id: int,
        info_repo: InformationRepository = Depends()
) -> InfoSchema:

    information : Information = info_repo.get_information_by_id(information_id)

    if information:
        return InfoSchema.model_validate(information)

    raise HTTPException(status_code=404, detail="Information Not Found")

@router.post("", status_code=201)
def create_information(
        request: CreateInfoRequest,
        info_repo: InformationRepository = Depends()
):
    information: Information = Information.create(request= request)
    information: Information = info_repo.create_information(information=information)

    return InfoSchema.model_validate(information)

@router.patch("/{information_id}", status_code=200)
def update_information(
        information_id: int,
        request : UpdateInfoSchema = Body(..., embed=True),
        info_repo: InformationRepository = Depends()
):
    information: Information | None = info_repo.get_information_by_id(information_id)

    if information:

        information.information_name = request.information_name
        information.information_content = request.information_content

        updated_information : Information = info_repo.update_information(information=information)

        return InfoSchema.model_validate(updated_information)

    raise HTTPException(status_code=404, detail="Information Not Found")

@router.delete("/{information_id}", status_code=204)
def delete_information(
        information_id: int,
        info_repo: InformationRepository = Depends()
):
    information: Information | None = info_repo.get_information_by_id(information_id)

    if not information:
        raise HTTPException(status_code=404, detail="Information Not Found")

    info_repo.delete_information(information_id)
