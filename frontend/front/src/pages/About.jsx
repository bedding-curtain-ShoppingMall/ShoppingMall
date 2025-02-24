import React, { useEffect, useState } from 'react';
import { getCompanyVisionValues } from '../api/AdminAPI';
import '../css/sh_common.css';
import '../css/sh_sub.css';
import '../css/sh_main.css';
import './About.css';
import { Link } from 'react-router-dom';

const About = () => {
  const [visionData, setVisionData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVisionData = async () => {
      try {
        const response = await getCompanyVisionValues();
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
      <div className="about-full-width-background">
        <div id="sh_container_wrapper">
          <div id="sh_content">
            <div id="greeting" className="pagecommon">
              <div className="tit_area">
                글로벌 기업으로 성장하겠습니다.
                <br />
                <p>
                  <b>ACE IT</b>가 여러분과 함께 만들어 갑니다.
                </p>
              </div>
              <div className="img"></div>
              <div className="cont">
                <p className="st">
                  먼저 고객 여러분의 변함없는 관심과 사랑에 깊이 감사드립니다.
                </p>
                <div className="pl">
                  글로벌 기업으로 성장하겠습니다. 여러분을 향한 (주)에이스아이티의 솔루션과 서비스는
                </div>
                <div className="pl">
                  고객에 대해 즐거운 책임을 갖고, 진정한 경쟁력을 약속합니다.
                </div>
                <div className="pl">
                  이러한 약속을 통해 (주)에이스아이티는 경쟁력 있는 솔루션 공급과 차별화된 서비스를 제공함으로써
                </div>
                <div className="pl">
                  세계 속에서도 인정받는 "글로벌 IT 서비스 회사"가 될 것입니다.
                </div>
                <br />
                <br />
                <div className="pl">
                  "성공은 목적지가 아니라 여정입니다. " -제프 베소스-
                </div>
                <p className="sign">
                  에이스아이티 대표이사 <span>홍승현</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default About;
