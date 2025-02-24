import React, { useEffect, useState } from 'react';
import { getBusinessAreaById } from '../../api/AdminAPI';
import './InfrastructureSystem.css'; // 수정된 CSS 파일 추가
import 'bootstrap/dist/css/bootstrap.min.css';

const InfrastructureSystem = () => {
  const [businessAreas, setBusinessAreas] = useState(null);

  useEffect(() => {
    getBusinessAreaById(3)
      .then((response) => setBusinessAreas(response.data))
      .catch((error) => console.error('사업 영역을 가져오는 중 오류 발생:', error));
  }, []);

  if (!businessAreas || !businessAreas.area_name) {
    return <p>데이터를 불러오는 중입니다...</p>;
  }

  const { area_name, area_details, area_content } = businessAreas; // area_content 추가

  return (
    <div className="container">
      <div className="infrastructureSystem-container py-5">
        {/* 줄바꿈 처리를 위해 dangerouslySetInnerHTML 사용 */}
        {area_content && (
          <p
            className="monitoring-content text-center mb-5"
            dangerouslySetInnerHTML={{ __html: area_content.replace(/\n/g, '<br/>') }}
          ></p>
        )}
        <div className="row justify-content-center">
          {Object.keys(area_details).map((key, index) => (
            <div key={index} className="col-md-9 mb-5">
              <div className="infrastructureSystem-custom-card shadow-sm h-100">
                {/* 숫자와 제목을 같이 배치 */}
                <div className="d-flex align-items-center infrastructureSystem-custom-header mb-3">
                  <div
                    className="infrastructureSystem-section-id rounded-circle d-flex align-items-center justify-content-center mr-3">
                    {`0${index + 1}`}
                  </div>
                  <h4 className="infrastructureSystem-custom-title mb-0">{key}</h4>
                </div>
                <div className="infrastructureSystem-custom-body">
                  <ul className="infrastructureSystem-list pl-3">
                    {area_details[key].map((item, itemIndex) => (
                      <li key={itemIndex} className="infrastructureSystem-item mb-2">
                        <i className="fas fa-check-circle mr-2 text-primary"></i>
                        <span dangerouslySetInnerHTML={{ __html: item.replace(/\n/g, '<br/>') }}></span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="infrastructureSystem-introduction-image-container text-center">
          <img
            src="/InfrastructureSystem.jpg"
            alt="회사 이미지"
            className="infrastructureSystem-introduction-company-image img-fluid"
          />
        </div>
      </div>
    </div>
  );
};

export default InfrastructureSystem;
