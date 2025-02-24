from typing import List
from fastapi import APIRouter, Depends, HTTPException, Body

from database.repository import HistoryRepository
from database.orm import History
from schema.request import CreateHistoryRequest
from schema.response import HistoryListSchema, HistorySchema, UpdateHistorySchema

router = APIRouter(prefix="/history")

@router.get("", status_code=200)
def get_history(
        history_repo : HistoryRepository = Depends()
) -> HistoryListSchema:
    history : List[History] = history_repo.get_history()

    return HistoryListSchema(
        history = [
            HistorySchema.model_validate(history) for history in history
        ]
    )

@router.get("/section_code/{history_section_code}", status_code=200)
def get_history(
        history_section_code: int,
        history_repo : HistoryRepository = Depends()
) -> HistoryListSchema:
    history : List[History] = history_repo.get_history_by_section_code(history_section_code)

    return HistoryListSchema(
        history = [
            HistorySchema.model_validate(history) for history in history
        ]
    )

@router.get("/id/{history_id}", status_code=200)
def get_history(
        history_id: int,
        history_repo : HistoryRepository = Depends()
) -> HistorySchema:
    history : History = history_repo.get_history_by_id(history_id)

    if history:
        return HistorySchema.model_validate(history)

    raise HTTPException(status_code=404, detail="History Not Found")

@router.post("", status_code=201)
def create_history(
        request: CreateHistoryRequest,
        history_repo : HistoryRepository = Depends()
):

    history: History = History.create(request=request)
    history: History = history_repo.create_history(history=history)

    return HistorySchema.model_validate(history)

@router.patch("/{history_id}", status_code=200)
def update_history(
        history_id: int,
        request : UpdateHistorySchema = Body(..., embed=True),
        history_repo: HistoryRepository = Depends()
):
    history: History | None = history_repo.get_history_by_id(history_id)

    if history:

        history.history_section_code = request.history_section_code
        history.history_date = request.history_date
        history.history_content = request.history_content

        update_history : History = history_repo.update_history(history=history)

        return HistorySchema.model_validate(update_history)

    raise HTTPException(status_code=404, detail="History Not Found")

@router.delete("/{history_id}", status_code=204)
def delete_history(
        history_id: int,
        history_repo: HistoryRepository = Depends()
):

    history: History | None = history_repo.get_history_by_id(history_id)

    if not history:
        raise HTTPException(status_code=404, detail="History Not Found")

    history_repo.delete_history(history_id)
