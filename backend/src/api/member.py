from datetime import timedelta
from typing import List

from fastapi import APIRouter, Depends, HTTPException, status

from api.login import create_access_token
from database.orm import Member
from database.repository import MemberRepository
from schema.request import CreateMemberRequest, LoginRequest
from schema.response import MemberListSchema, MemberSchema, UpdateMemberSchema
from utils.auth import get_password_hash, verify_password, ACCESS_TOKEN_EXPIRE_MINUTES

router = APIRouter(prefix="/member")

@router.get("", status_code=200)
def get_member(
        member_repo: MemberRepository = Depends()
) -> MemberListSchema:
    members: List[Member] = member_repo.get_member()

    return MemberListSchema(
        members=[
            MemberSchema.model_validate(member) for member in members
        ]
    )

@router.get("/{member_id}", status_code=200)
def get_member(
        member_id: int,
        member_repo: MemberRepository = Depends()
) -> MemberSchema:

    member : Member = member_repo.get_member_by_id(member_id)

    if member:
        return MemberSchema.model_validate(member)

    raise HTTPException(status_code=404, detail="Member Not Found")

@router.post("", status_code=201)
def create_member(
        request: CreateMemberRequest,
        member_repo: MemberRepository = Depends()
):
    # 중복 계정 확인
    existing_member = member_repo.get_member_by_accounts(request.member_accounts)

    if existing_member:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="This account already exists")

    member: Member = Member.create(request= request)
    member: Member = member_repo.create_member(member= member)

    return MemberSchema.model_validate(member)

@router.post("/login")
def login_member(
        request: LoginRequest,
        member_repo: MemberRepository = Depends()
):

    # 계정 확인
    member: Member | None = member_repo.get_member_by_accounts(request.member_accounts)
    if not member:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="존재하지 않는 계정이거나 비밀번호가 틀립니다."
        )

    # 비밀번호 검증
    if not verify_password(request.member_password, member.member_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="존재하지 않는 계정이거나 비밀번호가 틀립니다."
        )

    # jwt 토근 발급
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": member.member_accounts}, # payload에 어떤 정보를 담을지 결정(sub: 주체)
        expires_delta=access_token_expires
    )

    return {"access_token": access_token, "token_type": "bearer"}

@router.patch("/{member_id}", status_code=200)
def update_member(
        member_id: int,
        request: UpdateMemberSchema,
        member_repo: MemberRepository = Depends()
):
    member: Member | None = member_repo.get_member_by_id(member_id)

    if not member:
        raise HTTPException(status_code=404, detail="Member not found")

    if request.member_name is not None:
        member.member_name = request.member_name

    if request.member_accounts is not None:
        member.member_accounts = request.member_accounts

    if request.member_password is not None:
        member.member_password = get_password_hash(request.member_password)

    if request.member_grade is not None:
        member.member_grade = request.member_grade

    updated_member: Member = member_repo.update_member(member=member)

    return MemberSchema.model_validate(updated_member)

@router.delete("/{member_id}", status_code=204)
def delete_member(
        member_id: int,
        member_repo: MemberRepository = Depends()
):
    member: Member = member_repo.get_member_by_id(member_id)

    if not member:
        raise HTTPException(status_code=404, detail="Member not found")

    member_repo.delete_member(member_id)
