import React, { useState, useEffect } from 'react';
import { createHistory } from '../../../api/AdminAPI';
import { useNavigate, useLocation } from 'react-router-dom';
import './History.css';

const AddHistory = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [sectionCode, setSectionCode] = useState('');
    const [sectionText, setSectionText] = useState('');
    const [date, setDate] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const sectionCodeParam = queryParams.get('sectionCode');
        if (sectionCodeParam) {
            setSectionCode(sectionCodeParam);
            setSectionText(sectionCodeParam === '1' ? '회사 연혁' : '개발 본부 이력');
        }
    }, [location]);

    const handleSubmit = (e) => {
        e.preventDefault();
        createHistory({ history_section_code: parseInt(sectionCode), history_date: date, history_content: content })
            .then(() => {
                alert('히스토리가 성공적으로 추가되었습니다.');
                navigate(`/historyList?sectionCode=${sectionCode}`);
            })
            .catch((error) => console.error('히스토리 추가 중 오류 발생:', error));
    };

    return (
        <div className="history-container">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={sectionText}
                    readOnly
                />
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                />
                <textarea
                    placeholder="Content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                />
                <div className="form-button-container">
                    <button type="submit">추가</button>
                    <button type="button" onClick={() => navigate(`/historyList?sectionCode=${sectionCode}`)}>
                        목록으로 돌아가기
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddHistory;
