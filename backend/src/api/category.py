from typing import List

from fastapi import APIRouter, Depends, HTTPException

from database.orm import Category
from database.repository import CategoryRepository
from schema.request import CreateCategoryRequest
from schema.response import CategorySchema, CategoryListSchema, UpdateCategorySchema

router = APIRouter(prefix="/category")

@router.get("", status_code=200)
def get_category(
        category_repo: CategoryRepository = Depends()
) -> CategoryListSchema:

    categories : List[Category] = category_repo.get_category()

    return CategoryListSchema(
        categories=[
            CategorySchema.model_validate(category) for category in categories
        ]
    )

@router.get("/{category_id}", status_code=200)
def get_category(
        category_id: int,
        category_repo: CategoryRepository = Depends()
) -> CategorySchema:

    category: Category = category_repo.get_category_by_id(category_id)

    if category:
        return CategorySchema.model_validate(category)

    raise HTTPException(status_code=404, detail="Category Not Found")

@router.post("", status_code=201)
def create_category(
        request: CreateCategoryRequest,
        category_repo: CategoryRepository = Depends()
):
    category: Category = Category.create(request=request)
    category: Category = category_repo.create_category(category=category)

    return CategorySchema.model_validate(category)

@router.patch("/{category_id}", status_code=200)
def update_category(
        category_id: int,
        request: UpdateCategorySchema,
        category_repo: CategoryRepository = Depends()
):
    category: Category | None = category_repo.get_category_by_id(category_id)

    if not category:
        raise HTTPException(status_code=404, detail="Category Not Found")

    if request.category_large is not None:
        category.category_large = request.category_large

    if request.category_among is not None:
        category.category_among = request.category_among

    if request.category_cow is not None:
        category.category_cow = request.category_cow

    update_category: Category = category_repo.update_category(category)

    return CategorySchema.model_validate(update_category)

@router.delete("/{category_id}", status_code=204)
def delete_category(
        category_id: int,
        category_repo: CategoryRepository = Depends()
):
    category: Category = category_repo.get_category_by_id(category_id)

    if not category:
        raise HTTPException(status_code=404, detail="Category Not Found")

    category_repo.delete_category(category_id)


