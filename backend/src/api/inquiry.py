from fastapi import APIRouter, BackgroundTasks
from fastapi_mail import FastMail, ConnectionConfig, MessageSchema

from schema.request import EmailSchema

router = APIRouter(prefix="/inquiry")

# Gmail SMTP 설정
conf = ConnectionConfig(
    MAIL_USERNAME="aceithomepage@gmail.com",  # Gmail 계정 (발신자 이메일)
    MAIL_PASSWORD="cllx nkso fllh shyt",  # Gmail 앱 비밀번호 (애플리케이션 비밀번호)
    MAIL_FROM="aceithomepage@gmail.com",  # 발신자 이메일 (Gmail 계정과 동일)
    MAIL_PORT=587,  # Gmail SMTP 포트
    MAIL_SERVER="smtp.gmail.com",  # Gmail SMTP 서버 주소
    MAIL_STARTTLS=True,  # STARTTLS 활성화
    MAIL_SSL_TLS=False,  # SSL/TLS 비활성화
    USE_CREDENTIALS=True  # 인증 사용
)

@router.post("")
def send_inquiry(
        email: EmailSchema,
        background_tasks: BackgroundTasks
):
    # 이메일 내용
    body = (
        f"문의 작성자: {email.message.inquiry_writer}\n"
        f"작성자 이메일: {email.message.inquiry_writer_email or '없음'}\n"
        f"작성자 연락처: {email.message.inquiry_writer_contact_number or '없음'}\n"
        f"문의 내용: {email.message.inquiry_details or '없음'}"
    )

    message = MessageSchema(
        subject=email.subject,
        recipients=["sicorx@gmail.com"],  # 수신자 이메일
        body=body,
        subtype='plain'
    )

    # 비동기 작업으로 이메일 전송
    fm = FastMail(conf)
    background_tasks.add_task(fm.send_message, message)
    return {"message": "Mail sent successfully"}
