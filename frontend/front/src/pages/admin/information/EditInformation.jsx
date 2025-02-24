import React, { useState, useEffect } from 'react';
import { getInformationById, updateInformation } from '../../../api/AdminAPI';
import { useParams, useNavigate } from 'react-router-dom';
import './Information.css'; // 공통 스타일 파일 추가

const EditInformation = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        getInformationById(id)
          .then((response) => {
              setName(response.data.information_name);
              setContent(response.data.information_content);
          })
          .catch((err) => {
              console.error('정보를 가져오는 중 오류 발생:', err);
              setError('정보를 가져오는 데 실패했습니다.');
          })
          .finally(() => setLoading(false));
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await updateInformation(id, {
                information_name: name,
                information_content: content,
            });
            alert('정보가 성공적으로 수정되었습니다.');
            navigate('/informationList');
        } catch (err) {
            console.error('정보 수정 중 오류 발생:', err);
            alert('정보 수정에 실패했습니다. 다시 시도해 주세요.');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div className="loading">로딩 중...</div>;
    }

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    return (
      <div className="information-container">
          <h1>정보 수정</h1>
          <form onSubmit={handleSubmit}>
              <label htmlFor="information-name">정보 이름</label>
              <input
                id="information-name"
                type="text"
                placeholder="정보 이름"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <label htmlFor="information-content">정보 내용</label>
              <textarea
                id="information-content"
                placeholder="정보 내용"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                style={{ width: '400%', height: '300px', resize: 'vertical' }}
              />
              <div className="form-button-container">
                  <button type="submit" disabled={loading}>
                      수정
                  </button>
                  <button type="button" onClick={() => navigate('/informationList')} disabled={loading}>
                      목록으로 돌아가기
                  </button>
              </div>
          </form>
      </div>
    );
};

export default EditInformation;
