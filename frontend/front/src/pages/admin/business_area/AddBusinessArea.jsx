import React, { useState } from 'react';
import { createBusinessArea } from '../../../api/AdminAPI';
import { useNavigate } from 'react-router-dom';
import './BusinessArea.css';

const AddBusinessArea = () => {
    const [name, setName] = useState('');
    const [content, setContent] = useState('');
    const [areaType, setAreaType] = useState([{ key: '', value: '' }]);
    const [details, setDetails] = useState([{ key: '', value: '' }]);
    const navigate = useNavigate();

    const handleAddDetail = (setter) => {
        setter((prev) => [...prev, { key: '', value: '' }]);
    };

    const handleRemoveDetail = (setter, index) => {
        setter((prev) => prev.filter((_, i) => i !== index));
    };

    const handleDetailChange = (setter, index, field, value) => {
        setter((prev) => {
            const newDetails = [...prev];
            newDetails[index][field] = value;
            return newDetails;
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formattedAreaType = areaType.reduce((acc, item) => {
            if (item.key && item.value) {
                acc[item.key] = item.value;
            }
            return acc;
        }, {});

        const formattedDetails = details.reduce((acc, item) => {
            if (item.key && item.value) {
                acc[item.key] = item.value;
            }
            return acc;
        }, {});

        createBusinessArea({
            area_name: name,
            area_content: content || null,
            area_type: Object.keys(formattedAreaType).length > 0 ? formattedAreaType : null,
            area_details: Object.keys(formattedDetails).length > 0 ? formattedDetails : null,
        })
            .then(() => {
                alert('사업 영역이 성공적으로 추가되었습니다.');
                navigate('/listBusinessArea', { state: { selectedArea: name } });
            })
            .catch((error) => console.error('사업 영역 추가 중 오류 발생:', error));
    };

    return (
        <form onSubmit={handleSubmit} className="business-area-container">
            <input
                type="text"
                placeholder="사업 영역 이름"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <textarea
                placeholder="사업 영역 내용 (선택 사항)"
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />

            <div className="details-container">
                <h5>사업 유형</h5>
                <div className="details-inputs">
                    {areaType.map((item, index) => (
                        <div key={index} className="details-row-horizontal">
                            <input
                                type="text"
                                placeholder="Key"
                                value={item.key}
                                onChange={(e) => handleDetailChange(setAreaType, index, 'key', e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="Value"
                                value={item.value}
                                onChange={(e) => handleDetailChange(setAreaType, index, 'value', e.target.value)}
                            />
                            {areaType.length > 1 && (
                                <button type="button" onClick={() => handleRemoveDetail(setAreaType, index)}>삭제</button>
                            )}
                        </div>
                    ))}
                    <button type="button" onClick={() => handleAddDetail(setAreaType)} className="add-detail-button">유형 추가</button>
                </div>
            </div>

            <div className="details-container">
                <h5>세부 사항</h5>
                <div className="details-inputs">
                    {details.map((item, index) => (
                        <div key={index} className="details-row-horizontal">
                            <input
                                type="text"
                                placeholder="Key"
                                value={item.key}
                                onChange={(e) => handleDetailChange(setDetails, index, 'key', e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="Value"
                                value={item.value}
                                onChange={(e) => handleDetailChange(setDetails, index, 'value', e.target.value)}
                            />
                            {details.length > 1 && (
                                <button type="button" onClick={() => handleRemoveDetail(setDetails, index)}>삭제</button>
                            )}
                        </div>
                    ))}
                    <button type="button" onClick={() => handleAddDetail(setDetails)} className="add-detail-button">세부 사항 추가</button>
                </div>
            </div>

            <div className="form-button-container">
                <button type="submit">등록</button>
                <button type="button" onClick={() => navigate('/listBusinessArea')}>목록으로 돌아가기</button>
            </div>
        </form>
    );
};

export default AddBusinessArea;
