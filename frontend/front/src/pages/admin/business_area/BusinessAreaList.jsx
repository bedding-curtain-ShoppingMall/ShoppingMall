import React, { useEffect, useState } from 'react';
import { getBusinessAreas, deleteBusinessArea } from '../../../api/AdminAPI';
import { useNavigate, useLocation } from 'react-router-dom';
import './BusinessArea.css';
import AdminPage from "../AdminPage";

const BusinessAreaList = () => {
    const [businessAreas, setBusinessAreas] = useState([]);
    const location = useLocation();
    const [selectedArea, setSelectedArea] = useState(location.state?.selectedArea || null); // 전달된 이름으로 초기화
    const navigate = useNavigate();

    useEffect(() => {
        getBusinessAreas()
            .then((response) => setBusinessAreas(response.data.business_areas))
            .catch((error) => console.error('사업 영역을 가져오는 중 오류 발생:', error));
    }, []);

    const handleDelete = (id) => {
        if (window.confirm('정말 삭제하시겠습니까?')) {
            deleteBusinessArea(id)
                .then(() => {
                    setBusinessAreas((prev) => prev.filter((area) => area.area_id !== id));
                    setSelectedArea(null);
                })
                .catch((error) => console.error('사업 영역 삭제 중 오류 발생:', error));
        }
    };

    const renderDetails = (details) => {
        if (!details) return <div></div>;

        return Object.entries(details).map(([key, value], index) => (
            <div className="details-row" key={index}>
                <span className="detail-key">{key}</span>
                <span className="detail-value">{value}</span>
            </div>
        ));
    };

    const filteredAreas = selectedArea
        ? businessAreas.filter(area => area.area_name === selectedArea)
        : businessAreas;

    const uniqueAreaNames = [...new Set(businessAreas.map(area => area.area_name))];

    return (
      <div className="business-area-container">
        <div className="button-container">
          <button onClick={() => navigate('/addBusinessArea')}>사업 영역 추가</button>
          <button onClick={() => navigate('/admin')}>관리자 페이지로 돌아가기</button>
        </div>

        <div className="area-buttons">
          <button
            className={`area-button ${selectedArea === null ? 'active' : ''}`}
            onClick={() => setSelectedArea(null)}
          >
            전체 보기
          </button>
          {uniqueAreaNames.map(name => (
            <button
              key={name}
              className={`area-button ${selectedArea === name ? 'active' : ''}`}
              onClick={() => setSelectedArea(name)}
            >
              {name}
            </button>
          ))}
        </div>
        <div className="content-container">
          <AdminPage className="admin-page"/>
          <ul className="business-area-list">
            {filteredAreas.map((area) => (
              <li key={area.area_id}>
                <h5>{area.area_name}</h5>
                {area.area_content && (
                  <div className="business-description-row">
                    <h6 className="business-description-title">사업 설명</h6>
                    <p className="business-description-content">{area.area_content}</p>
                  </div>
                )}
                <div className="details-section">
                  <h6>사업 유형</h6>
                  {renderDetails(area.area_type)}
                </div>
                <div className="details-section">
                  <h6>세부 사항</h6>
                  {renderDetails(area.area_details)}
                </div>
                <div className="button-group">
                  <button onClick={() => navigate(`/editBusinessArea/${area.area_id}`)}>수정</button>
                  <button onClick={() => handleDelete(area.area_id)}>삭제</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
        </div>
        );
        };

        export default BusinessAreaList;
