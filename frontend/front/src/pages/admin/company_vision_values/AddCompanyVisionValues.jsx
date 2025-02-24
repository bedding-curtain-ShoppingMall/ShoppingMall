import React, { useState } from 'react';
import { createCompanyVisionValue } from '../../../api/AdminAPI';
import { useNavigate } from 'react-router-dom';
import './CompanyVisionValues.css'; // CSS 파일 추가

const AddCompanyVisionValue = () => {
    const [name, setName] = useState('');
    const [content, setContent] = useState('');
    const [details, setDetails] = useState([{ key: '', value: '' }]); // key-value 쌍 리스트로 초기화
    const navigate = useNavigate();

    // key-value 쌍 추가
    const handleAddDetail = () => {
        setDetails([...details, { key: '', value: '' }]);
    };

    // key-value 쌍 삭제
    const handleRemoveDetail = (index) => {
        const newDetails = [...details];
        newDetails.splice(index, 1);
        setDetails(newDetails);
    };

    // key-value 입력값 변경 핸들러
    const handleDetailChange = (index, field, value) => {
        const newDetails = [...details];
        newDetails[index][field] = value;
        setDetails(newDetails);
    };

    // form 제출 핸들러
    const handleSubmit = (e) => {
        e.preventDefault();
        const formattedDetails = details.reduce((acc, detail) => {
            if (detail.key && detail.value) {
                acc[detail.key] = detail.value;
            }
            return acc;
        }, {});

        createCompanyVisionValue({
            vv_name: name,
            vv_content: content || null, // 빈 값일 경우 null로 처리
            vv_details: Object.keys(formattedDetails).length > 0 ? formattedDetails : null // 빈 경우 null로 처리
        })
            .then(() => {
                alert('비전 값이 성공적으로 추가되었습니다.');
                navigate('/companyVisionValuesList');
            })
            .catch((error) => console.error('비전 값 추가 중 오류 발생:', error));
    };

    return (
        <div className="vision-values-container">
            <form onSubmit={handleSubmit}>

                <div className="form-button-container">
                    <button type="submit">등록</button>
                    <button type="button" onClick={() => navigate('/companyVisionValuesList')}>목록으로 돌아가기</button>
                </div>

                <input
                    type="text"
                    placeholder="비전 이름"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <textarea
                    placeholder="비전 설명"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />

                <div className="details-container">
                    <h5>비전 세부 사항</h5>
                    <div className="details-inputs">
                        {details.map((detail, index) => (
                            <div key={index} className="details-row-horizontal">
                                <input
                                    type="text"
                                    placeholder="Key"
                                    value={detail.key}
                                    onChange={(e) => handleDetailChange(index, 'key', e.target.value)}
                                />
                                <input
                                    type="text"
                                    placeholder="Value"
                                    value={detail.value}
                                    onChange={(e) => handleDetailChange(index, 'value', e.target.value)}
                                />
                                {details.length > 1 && (
                                    <button type="button" onClick={() => handleRemoveDetail(index)}>
                                        삭제
                                    </button>
                                )}
                            </div>
                        ))}
                        <button type="button" onClick={handleAddDetail} className="add-detail-button">
                            세부 사항 추가
                        </button>
                    </div>
                </div>

            </form>
        </div>
    );
};

export default AddCompanyVisionValue;