// src/pages/business/SystemDevelop.js
import React, { useEffect, useState } from 'react';
import { getBusinessAreaById } from '../../api/AdminAPI';
import { motion } from 'framer-motion';
import './SystemDevelop.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const SystemDevelop = () => {
  const [businessAreas, setBusinessAreas] = useState(null);

  useEffect(() => {
    getBusinessAreaById(1)
      .then((response) => setBusinessAreas(response.data))
      .catch((error) => console.error('사업 영역을 가져오는 중 오류 발생:', error));
  }, []);

  if (!businessAreas) {
    return <p>데이터를 불러오는 중입니다...</p>;
  }

  const { area_details } = businessAreas;

  // 프로세스 단계 배열
  const processSteps = [
    '분석 및 설계',
    '개발 및 제작',
    '평가',
    '실행 및 운영',
  ];

  return (
    <div className="container">
      <div className="systemDevelop-container py-5">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {opacity: 0, y: 20},
            visible: {opacity: 1, y: 0, transition: {duration: 0.8}},
          }}
        >
          <div className="row">
            {Object.keys(area_details).map((key, index) => (
              <div key={index} className="col-md-6 col-lg-6 mb-4">
                <div className="systemDevelop-custom-card shadow-sm h-100">
                  <div className="d-flex align-items-center systemDevelop-custom-header mb-3">
                    <div
                      className="systemDevelop-section-id rounded-circle d-flex align-items-center justify-content-center mr-3"
                    >
                      {`0${index + 1}`}
                    </div>
                    <h4 className="systemDevelop-custom-title mb-0">{key}</h4>
                  </div>
                  <div className="systemDevelop-custom-body">
                    <ul className="systemDevelop-list pl-3">
                      {area_details[key].map((item, itemIndex) => (
                        <li key={itemIndex} className="systemDevelop-item mb-2">
                          <i className="fas fa-check-circle mr-2 text-primary"></i> {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="systemDevelop-process-flow-container">
            <div className="systemDevelop-process-step">
              <div className="systemDevelop-process-box">분석 및 설계</div>
            </div>
            <div className="systemDevelop-process-arrow">➨</div>
            <div className="systemDevelop-process-step">
              <div className="systemDevelop-process-box">개발 및 제작</div>
            </div>
            <div className="systemDevelop-process-arrow">➨</div>
            <div className="systemDevelop-process-step">
              <div className="systemDevelop-process-box">평가</div>
            </div>
            <div className="systemDevelop-process-arrow">➨</div>
            <div className="systemDevelop-process-step">
              <div className="systemDevelop-process-box">실행 및 운영</div>
            </div>
          </div>

        </motion.div>
      </div>
    </div>
  );
};

export default SystemDevelop;
