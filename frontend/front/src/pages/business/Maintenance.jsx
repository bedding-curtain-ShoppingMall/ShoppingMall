import React, { useEffect, useState } from 'react';
import { getBusinessAreaById } from '../../api/AdminAPI';
import './Maintenance.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Maintenance = () => {
    const [businessAreas, setBusinessAreas] = useState(null);

    useEffect(() => {
        getBusinessAreaById(4)
          .then((response) => setBusinessAreas(response.data))
          .catch((error) => console.error('사업 영역을 가져오는 중 오류 발생:', error));
    }, []);

    if (!businessAreas || !businessAreas.area_name) {
        return <p>데이터를 불러오는 중입니다...</p>;
    }

    const { area_name, area_details, area_content } = businessAreas; // area_content 추가

    const keys = Object.keys(area_details);
    const equipmentKey = keys.find(
      (key) => key === '투입장비' || key === '04' || key.includes('투입장비')
    );

    let reorderedKeys = keys.filter((key) => key !== equipmentKey);
    if (equipmentKey) {
        reorderedKeys.push(equipmentKey);
    }

    return (
      <div className="container py-5">
          {/* 줄바꿈 처리를 위해 dangerouslySetInnerHTML 사용 */}
          <p
            className="monitoring-content text-center mb-5"
            dangerouslySetInnerHTML={{ __html: area_content.replace(/\n/g, '<br/>') }}
          ></p>
          <div className="row">
              {reorderedKeys.map((key, index) => (
                <div key={index} className="col-md-6 mb-4">
                    <div className="maintenance-custom-card shadow-sm h-100">
                        <div className="d-flex align-items-center maintenance-custom-header mb-3">
                            <div
                              className="maintenance-section-id rounded-circle d-flex align-items-center justify-content-center mr-3">
                                {`0${index + 1}`}
                            </div>
                            <h4 className="maintenance-custom-title mb-0">{key}</h4>
                        </div>
                        <div className="maintenance-custom-body">
                            <ul
                              className={`maintenance-list pl-3 ${
                                equipmentKey === key ? 'maintenance-horizontal-list' : ''
                              }`}
                            >
                                {area_details[key].map((item, itemIndex) => (
                                  <li
                                    key={itemIndex}
                                    className={`maintenance-item ${
                                      equipmentKey === key ? 'maintenance-horizontal-item' : ''
                                    }`}
                                  >
                                      {equipmentKey === key ? (
                                        // 4번 섹션 (투입장비 측정기): 가로 정렬
                                        <>
                                            <i className="fas fa-check-circle text-primary"></i>
                                            <span className="maintenance-item-name">{item}</span>
                                            <div className="maintenance-image-container">
                                                <img
                                                  src={`/image_${itemIndex + 1}.jpg`}
                                                  alt={item}
                                                  className="maintenance-img-fluid"
                                                />
                                            </div>
                                        </>
                                      ) : (
                                        // 1번~3번 섹션: 이미지 제외, 텍스트만 표시
                                        <>
                                            <i className="fas fa-check-circle mr-2 text-primary"></i>
                                            <span
                                              dangerouslySetInnerHTML={{ __html: item.replace(/\n/g, '<br/>') }}
                                            ></span>
                                        </>
                                      )}
                                  </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
              ))}
          </div>
      </div>
    );
};

export default Maintenance;
