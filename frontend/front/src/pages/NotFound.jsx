import './NotFound.css'; // CSS 파일 경로 수정

const NotFound = () => {
    return (
        <div>
            <div className="content">
                <div className="error-message">
                    <p className="title">
                        <img src="/notfound2.png" alt="notfound"/>
                    </p>
                </div>
                {/* 불필요한 </p> 제거 및 div 닫기 */}
                <h1>404 - 페이지를 찾을 수 없습니다.</h1>
                <p>요청하신 페이지가 존재하지 않습니다.</p>
                <a href="/">홈으로 돌아가기</a>
            </div>
        </div>
    );
};

export default NotFound;
