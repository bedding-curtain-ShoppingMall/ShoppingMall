import React, { useState } from 'react';
import { createInformation } from '../../../api/AdminAPI';
import { useNavigate } from 'react-router-dom';
import './Information.css'; // 공통 스타일 파일 추가

const AddInformation = () => {
    const [name, setName] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        createInformation({ information_name: name, information_content: content })
            .then(() => {
                alert('정보가 성공적으로 추가되었습니다.');
                navigate('/informationList');
            })
            .catch((error) => console.error('정보 추가 중 오류 발생:', error));
    };

    return (
        <div className="information-container">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="정보 이름"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <textarea
                    placeholder="정보 내용"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                />
                <div className="form-button-container">
                    <button type="submit">추가</button>
                    <button type="button" onClick={() => navigate('/informationList')}>
                        목록으로 돌아가기
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddInformation;
