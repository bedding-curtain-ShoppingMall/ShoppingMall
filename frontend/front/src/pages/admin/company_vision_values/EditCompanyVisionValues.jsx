import React, { useState, useEffect } from 'react';
import { getCompanyVisionValueById, updateCompanyVisionValue } from '../../../api/AdminAPI';
import { useParams, useNavigate } from 'react-router-dom';
import './CompanyVisionValues.css';

const EditCompanyVisionValue = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [content, setContent] = useState('');
    const [details, setDetails] = useState([{ key: '', value: '' }]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getCompanyVisionValueById(id)
            .then((response) => {
                const visionValue = response.data;
                setName(visionValue.vv_name);
                setContent(visionValue.vv_content || '');

                const detailsArray = visionValue.vv_details
                    ? Object.entries(visionValue.vv_details).map(([key, value]) => ({ key, value }))
                    : [{ key: '', value: '' }];
                setDetails(detailsArray);

                setLoading(false);
            })
            .catch((error) => {
                console.error('비전 값을 가져오는 중 오류 발생:', error);
                setLoading(false);
            });
    }, [id]);

    const handleAddDetail = () => {
        setDetails([...details, { key: '', value: '' }]);
    };

    const handleRemoveDetail = (index) => {
        const newDetails = [...details];
        newDetails.splice(index, 1);
        setDetails(newDetails);
    };

    const handleDetailChange = (index, field, value) => {
        const newDetails = [...details];
        newDetails[index][field] = value;
        setDetails(newDetails);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formattedDetails = details.reduce((acc, detail) => {
            if (detail.key && detail.value) {
                acc[detail.key] = detail.value;
            }
            return acc;
        }, {});

        updateCompanyVisionValue(id, {
            vv_name: name,
            vv_content: content || null,
            vv_details: Object.keys(formattedDetails).length > 0 ? formattedDetails : null
        })
            .then(() => {
                alert('비전 값이 성공적으로 수정되었습니다.');
                navigate('/companyVisionValuesList');
            })
            .catch((error) => console.error('비전 값 수정 중 오류 발생:', error));
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="vision-values-container">
            <form onSubmit={handleSubmit}>

                <div className="form-button-container">
                    <button type="submit">수정</button>
                    <button type="button" onClick={() => navigate('/companyVisionValuesList')}>
                        목록으로 돌아가기
                    </button>
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
                    style={{ width: '100%', height: '200px', resize: 'vertical' }}
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
                                    style={{ width: '40px', height: '40px'}}
                                />
                                <textarea
                                    placeholder="Value"
                                    value={detail.value}
                                    onChange={(e) => handleDetailChange(index, 'value', e.target.value)}
                                    style={{ width: '300px', height: '200px', resize: 'vertical' }}
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

export default EditCompanyVisionValue;
