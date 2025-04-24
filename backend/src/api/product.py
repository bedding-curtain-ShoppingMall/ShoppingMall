from pathlib import Path
from typing import List, Annotated

from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form

from database.orm import Product, ProductImg
from database.repository import ProductRepository, ProductImgRepository
from schema.request import CreateProductRequest, CreateProductImgRequest
from schema.response import ProductImgSchema, ProductWithImgSchema, ProductSchema, ProductWithImgListSchema, \
    UpdateProductSchema

router = APIRouter(prefix="/product")

PRODUCT_DIR = Path("static/product/")
PRODUCT_DIR.mkdir(parents=True, exist_ok=True) # 폴더 생성 코드

@router.get("", status_code=200)
def get_product_with_img(
        product_repo: ProductRepository = Depends(),
        img_repo: ProductImgRepository = Depends()
) -> ProductWithImgListSchema:

    products: List[Product] = product_repo.get_product()

    result = []

    for product in products:
        img = img_repo.get_image_by_product_id(product.product_id)

        result.append(ProductWithImgSchema(
            product=ProductSchema.model_validate(product),
            img=ProductImgSchema.model_validate(img) if img else None
        ))

    return ProductWithImgListSchema(products=result)

@router.get("{product_id}", status_code=200)
def get_product_with_img(
        product_id: int,
        product_repo: ProductRepository = Depends(),
        img_repo: ProductImgRepository = Depends()
) -> ProductWithImgSchema:

    product = product_repo.get_product_by_id(product_id)

    if product:
        img = img_repo.get_image_by_product_id(product_id)
        return ProductWithImgSchema(
            product=ProductSchema.model_validate(product),
            img=ProductImgSchema.model_validate(img) if img else None
        )

    raise HTTPException(status_code=404, detail="Product not found")

@router.post("", status_code=201)
def create_product_with_img(
        request: Annotated[CreateProductRequest, Depends(CreateProductRequest.as_form)],
        product_file: UploadFile = File(...),
        img_featured: UploadFile = File(...), # 상품 대표이미지
        img_list: List[UploadFile] = File([]), # 일반 상품 이미지
        product_repo: ProductRepository = Depends(),
        img_repo: ProductImgRepository = Depends()
):

    product: Product = Product.create(request=request)

    if product_file:
        product_file_name = product_file.filename
        product_file_path = PRODUCT_DIR / product_file_name
        product_saved_path = str(product_file_path).replace("\\", "/")

        with product_file_path.open(mode="wb") as buffer:
            buffer.write(product_file.file.read())

        product.product_info_name = product_file.filename
        product.product_info_path = product_saved_path

    product: Product = product_repo.create_product(product)

    product_img = ProductImg.create(request=CreateProductImgRequest(product_id=product.product_id))

    if img_featured:
        featured_name = img_featured.filename
        featured_path = PRODUCT_DIR / featured_name
        featured_saved_path = str(featured_path).replace("\\", "/")

        with featured_path.open(mode="wb") as buffer:
            buffer.write(img_featured.file.read())

        product_img.img_featured_name = featured_name
        product_img.img_featured_path = featured_saved_path

    if img_list:
        for i, img_file in enumerate(img_list[:5], start=1):
            img_name = img_file.filename
            img_path = PRODUCT_DIR / img_name
            img_saved_path = str(img_path).replace("\\", "/")

            with img_path.open(mode="wb") as buffer:
                buffer.write(img_file.file.read())

            setattr(product_img, f"img{i}_name", img_name)
            setattr(product_img, f"img{i}_path", img_saved_path)

    product_img: ProductImg = img_repo.create_image(product_img)

    return ProductWithImgSchema(
        product=ProductSchema.model_validate(product),
        img=ProductImgSchema.model_validate(product_img)
    )

@router.patch("/{product_id}", status_code=200)
def update_product_with_img(
        product_id: int,
        request: Annotated[UpdateProductSchema, Depends(UpdateProductSchema.as_form)],
        product_file: UploadFile = File(None),
        img_featured: UploadFile = File(None),
        img1_file: UploadFile = File(None),
        img2_file: UploadFile = File(None),
        img3_file: UploadFile = File(None),
        img4_file: UploadFile = File(None),
        img5_file: UploadFile = File(None),
        delete_featured: bool = Form(False),
        delete_img1: bool = Form(False),
        delete_img2: bool = Form(False),
        delete_img3: bool = Form(False),
        delete_img4: bool = Form(False),
        delete_img5: bool = Form(False),
        product_repo: ProductRepository = Depends(),
        img_repo: ProductImgRepository = Depends()
):
    product = product_repo.get_product_by_id(product_id)

    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    # request에 들어온 수정값만 product 객체에 수정
    for field, value in request.dict(exclude_unset=True).items():
        setattr(product, field, value)

    # 새로운 상품 상세 정보 파일 등록
    if product_file:
        old_path = Path(product.product_info_path) if product.product_info_path else None

        # 기존 상품 상세 정보 파일 삭제
        if old_path and old_path.exists():
            old_path.unlink()

        file_path = PRODUCT_DIR / product_file.filename
        with file_path.open(mode="wb") as buffer:
            buffer.write(product_file.file.read())

        product.product_info_name = product_file.filename
        product.product_info_path = str(file_path).replace("\\", "/")

    product: Product = product_repo.update_product(product)

    product_img = img_repo.get_image_by_product_id(product_id)

    # product_id 로 product_img 가 조회되지 않을 경우 신규 생성
    if not product_img:
        product_img = ProductImg(product_id=product_id)

    # 신규 대표 이미지 업로드 시 이미지 등록
    if img_featured:

        if product_img.img_featured_path:
            old = Path(product_img.img_featured_path)
            if old.exists():
                old.unlink()

        file_path = PRODUCT_DIR / img_featured.filename
        with file_path.open(mode="wb") as buffer:
            buffer.write(img_featured.file.read())

        product_img.img_featured_name = img_featured.filename
        product_img.img_featured_path = str(file_path).replace("\\", "/")

    # 대표 이미지 삭제 체크 or 기존 대표 이미지 코드 있는 경우 삭제
    elif delete_featured and product_img.img_featured_path:
        old = Path(product_img.img_featured_path)
        if old.exists():
            old.unlink()
        
        product_img.img_featured_name = None
        product_img.img_featured_path = None

    delete_flags = [delete_img1, delete_img2, delete_img3, delete_img4, delete_img5]
    img_files = [img1_file, img2_file, img3_file, img4_file, img5_file]

    for i in range(1, 6):
        file = img_files[i-1]
        should_delete = delete_flags[i-1]
        img_name = f"img{i}_name"
        img_path = f"img{i}_path"

        if file:
            old_path = getattr(product_img, img_path)
            if old_path:
                old = Path(old_path)
                if old.exists():
                    old.unlink()

            file_path = PRODUCT_DIR / file.filename
            with file_path.open(mode="wb") as buffer:
                buffer.write(file.file.read())

            setattr(product_img, img_name, file.filename)
            setattr(product_img, img_path, str(file_path).replace("\\", "/"))

        elif should_delete:
            path = getattr(product_img, img_path)
            if path:
                file = Path(path)
                if file.exists():
                    file.unlink()

            setattr(product_img, img_name, None)
            setattr(product_img, img_path, None)

    product_img: ProductImg = img_repo.update_image(product_img)

    return ProductWithImgSchema(
        product=ProductSchema.model_validate(product),
        img=ProductImgSchema.model_validate(product_img)
    )

@router.delete("/{product_id}", status_code=204)
def delete_product_with_img(
        product_id: int,
        product_repo: ProductRepository = Depends(),
        img_repo: ProductImgRepository = Depends()
):
    product: Product = product_repo.get_product_by_id(product_id)

    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    # 상품 상세 파일 삭제
    if product.product_info_path:
        info_file = Path(product.product_info_path)
        if info_file.exists():
            info_file.unlink()

    product_img = img_repo.get_image_by_product_id(product_id)

    if product_img:
        if product_img.img_featured_path:
            featured = Path(product_img.img_featured_path)
            if featured.exists():
                featured.unlink()

        for i in range(1, 6):
            path = getattr(product_img, f"img{i}_path")
            if path:
                file = Path(path)
                if file.exists():
                    file.unlink()

        img_repo.delete_image(product_img.img_id)

    product_repo.delete_product(product_id)
