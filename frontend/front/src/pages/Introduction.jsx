// Introduction.jsx
import React, {useEffect, useState} from 'react';
import CountUp from 'react-countup'; // react-countup 라이브러리 추가
import {getCompanyVisionValues} from '../api/AdminAPI'; // AdminAPI에서 함수 가져오기
import './Introduction.css';

const Introduction = () => {
  const [visionData, setVisionData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVisionData = async () => {
      try {
        const response = await getCompanyVisionValues();
        console.log('Response List:', response);
        setVisionData(response.data.company_vision_values || []);
      } catch (err) {
        console.error('Error fetching company vision values:', err);
        setError(err.message || '데이터를 가져오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchVisionData();
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <>
      <div className="a1-container">
        <section id="bg-counters" className="padding bg-counters">
          <div className="container">
            <div className="row">
              <div className="col-12 text-center">
                <div className="heading-title whitecolor wow fadeInUp" data-wow-delay="300ms">
                  <h2 className="font-normal titillium">ACE IT Manager-Center</h2>
                  <p className="white-text large-text">
                    ACE IT 24시간 365일 함께 합니다.
                  </p>
                </div>
              </div>
            </div>
            <div className="row align-items-center text-center">
              <Counter
                src="/counters_hour.png"
                altText="hour"
                count={24}
                label="HOUR"
              />
              <Counter
                src="/counters_day.png"
                altText="day"
                count={365}
                label="DAY"
              />
            </div>
          </div>
        </section>
      </div>
      <div className="introduction-container">
        <div className="introduction-image-container">
          <img
            src="/AdobeStock_vision.jpeg"
            alt="회사 이미지"
            className="introduction-company-image"
          />
        </div>
        <div className="text-container">
          <h2>ACE IT VISION</h2>
          <p className="subheading">새로운 기술, 고객과의 소통을 통한 새로운 패러다임을 제시</p>
          <ul className="vision-list">
            {visionData
              .filter((item) => item.vv_id >= 2)
              .map((item) => (
                <li key={item.vv_id} className="vision-item">
        <span className="vv_text titillium">
          {item.vv_name}
          {item.vv_content ? `: ${item.vv_content}` : ''}
        </span>
                  {item.vv_details && (
                    <p className="vv_details titillium">{Object.values(item.vv_details).join(', ')}</p>
                  )}
                </li>
              ))}
          </ul>
        </div>
      </div>
    </>
  );
};

// Counter 컴포넌트 분리 및 수정
const Counter = ({src, altText, count, label}) => (
  <div className="col-lg-6 col-md-6 col-sm-6">
    <div className="counters whitecolor">
      <span className="count-ico">
        <img src={src} alt={altText} className={`count-${altText}`}/>
      </span>
      <span className="count_nums font-light" data-speed="5500" style={{color: 'white'}}>
        <CountUp end={count} duration={8.5}/>
      </span>
    </div>
    <h3 className="font-light whitecolor top30" style={{color: 'white'}}>{label}</h3>
  </div>
);

export default Introduction;
