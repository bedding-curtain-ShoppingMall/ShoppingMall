import os
from pathlib import Path
from PIL import Image
from typing import List, Optional

from fastapi import Depends, APIRouter, HTTPException, Form, UploadFile, File

from database.orm import BusinessClient
from database.repository import BusinessClientRepository
from schema.response import BusinessClientListSchema, BusinessClientSchema

router = APIRouter(prefix="/businessClient")

LOGO_DIR = Path("logos/")
LOGO_DIR.mkdir(parents=True, exist_ok=True)  # 디렉토리 생성 코드
THUMBNAIL_SIZE = (200, 100)

@router.get("", status_code=200)
def get_business_client(
        client_repo : BusinessClientRepository = Depends()
) -> BusinessClientListSchema:
    business_clients : List[BusinessClient] = client_repo.get_business_client()

    return BusinessClientListSchema(
        business_clients=[
            BusinessClientSchema.model_validate(business_client) for business_client in business_clients
     
        ]
    )

@router.get("/{client_id}", status_code=200)
def get_business_client(
        client_id: int,
        client_repo : BusinessClientRepository = Depends()
) -> BusinessClientSchema:

    business_client : BusinessClient = client_repo.get_business_client_by_id(client_id)

    if business_client:
        return BusinessClientSchema.model_validate(business_client)

    raise HTTPException(status_code=404, detail="BusinessClient Not Found")

@router.post("", status_code=201)
def create_business_client(
        client_name : str = Form(...),
        client_logo : Optional[UploadFile] = File(None),
        client_repo : BusinessClientRepository = Depends()
):

    business_client : BusinessClient = BusinessClient.create(client_name=client_name)
    business_client = client_repo.create_business_client(businessClient=business_client)

    if client_logo:
        thumbnail_path = LOGO_DIR / f"{business_client.client_id}_thumbnail_{client_logo.filename}"

        with Image.open(client_logo.file) as img:
            img.thumbnail(THUMBNAIL_SIZE)
            img.save(thumbnail_path)

        business_client.client_logo_name = client_logo.filename
        business_client.client_logo_path = str(thumbnail_path).replace("\\", "/")

    business_client: BusinessClient = client_repo.update_business_client(businessClient=business_client)

    return BusinessClientSchema.model_validate(business_client)

@router.patch("/{client_id}", status_code=200)
def update_business_client(
        client_id: int,
        client_name : str = Form(...),
        delete_logo: bool = Form(False),
        client_logo : Optional[UploadFile] = File(None),
        client_repo : BusinessClientRepository = Depends()
):
    business_client: BusinessClient | None = client_repo.get_business_client_by_id(client_id)

    if not business_client:
        raise HTTPException(status_code=404, detail="BusinessClient Not Found")

    business_client.client_name = client_name

    if delete_logo and business_client.client_logo_path:
        existing_logo_path = os.path.join(LOGO_DIR, business_client.client_logo_path.split("/")[-1])
        if os.path.exists(existing_logo_path):
            os.remove(existing_logo_path)

        business_client.client_logo_name = None
        business_client.client_logo_path = None

    if client_logo:
        if business_client.client_logo_path:
            existing_logo_path = os.path.join(LOGO_DIR, business_client.client_logo_path.split("/")[-1])
            if os.path.exists(existing_logo_path):
                os.remove(existing_logo_path)

        thumbnail_path = LOGO_DIR / f"{business_client.client_id}_thumbnail_{client_logo.filename}"

        with Image.open(client_logo.file) as img:
            img.thumbnail(THUMBNAIL_SIZE)
            img.save(thumbnail_path)

        business_client.client_logo_name = client_logo.filename
        business_client.client_logo_path = str(thumbnail_path).replace("\\", "/")

    updated_client: BusinessClient = client_repo.update_business_client(businessClient=business_client)

    return BusinessClientSchema.model_validate(updated_client)



@router.delete("/{client_id}", status_code=204)
def delete_business_client(
        client_id: int,
        client_repo : BusinessClientRepository = Depends()
):
    business_client: BusinessClient | None = client_repo.get_business_client_by_id(client_id)

    if not business_client:
        raise HTTPException(status_code=404, detail="BusinessClient Not Found")

    if business_client.client_logo_path:
        existing_logo_path = os.path.join(LOGO_DIR, business_client.client_logo_path.split("/")[-1])
        if os.path.exists(existing_logo_path):
            os.remove(existing_logo_path)

    client_repo.delete_business_client(client_id)
