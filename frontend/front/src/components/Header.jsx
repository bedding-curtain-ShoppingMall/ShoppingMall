// src/components/Header.jsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './layouts/Navigation/NavbarComp.css';
import './Header.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { getBusinessAreas, getBusinessClients, API_SERVER_HOST } from '../api/AdminAPI';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination as SwiperPagination } from 'swiper/modules';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import 'bootstrap/dist/css/bootstrap.min.css';
import AnimatedText from './AnimatedText'; // AnimatedText 컴포넌트 임포트

// 사용자 정의 Pagination 컴포넌트 이름 변경
const CustomPagination = ({ currentPage, totalPages, onPageChange }) => (
  <div className="pagination-container" style={{ marginTop: '20px', textAlign: 'center' }}>
    <button
      onClick={() => onPageChange(currentPage - 1)}
      disabled={currentPage === 1}
      className="btn btn-secondary"
      style={{ marginRight: '10px' }}
      type="button"
    >
      Previous
    </button>
    {[...Array(totalPages)].map((_, index) => (
      <button
        key={index + 1}
        onClick={() => onPageChange(index + 1)}
        className={`btn ${currentPage === index + 1 ? 'btn-primary' : 'btn-outline-primary'}`}
        style={{ margin: '0 5px' }}
        type="button"
      >
        {index + 1}
      </button>
    ))}
    <button
      onClick={() => onPageChange(currentPage + 1)}
      disabled={currentPage === totalPages}
      className="btn btn-secondary"
      style={{ marginLeft: '10px' }}
      type="button"
    >
      Next
    </button>
  </div>
);

const Header = () => {
  const [clientData, setClientData] = useState([]);
  const [loadingClients, setLoadingClients] = useState(true);
  const [errorClients, setErrorClients] = useState(null);

  const [areaData, setAreaData] = useState([]);
  const [loadingAreas, setLoadingAreas] = useState(true);
  const [errorAreas, setErrorAreas] = useState(null);

  const [currentPageClients] = useState(1);
  const [cardsPerPageClients] = useState(6);

  const [currentPageAreas] = useState(1);
  const [cardsPerPageAreas] = useState(6);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await getBusinessClients();
        const clients = response.data.business_clients || response.data;
        if (!Array.isArray(clients)) throw new Error('API 응답이 예상과 다릅니다.');
        const processedData = clients.map((client) => ({
          id: client.client_id,
          name: client.client_name,
          client_logo_path: client.client_logo_path,
          logoName: client.client_logo_name,
        }));
        setClientData(processedData);
      } catch (err) {
        console.error('Error fetching client data:', err);
        setErrorClients('데이터를 불러오는 데 실패했습니다.');
      } finally {
        setLoadingClients(false);
      }
    };
    fetchClients();
  }, []);

  useEffect(() => {
    const fetchAreas = async () => {
      try {
        const response = await getBusinessAreas();
        const visionValues = response.data.business_areas || [];
        const imageList = [
          '/AdobeStock_2.jpeg',
          '/AdobeStock_3.jpeg',
          '/AdobeStock_4.jpeg',
          '/AdobeStock_maintenance.jpeg',
          '/AdobeStock_communications.jpeg',
          '/AdobeStock_guard.jpg',
        ];
        const processedData = visionValues.map((item, index) => ({
          id: item.area_id,
          title: item.area_name,
          image: imageList[index % imageList.length],
          lastUpdated: 'Recently',
          link:
            item.area_name === '시스템 개발'
              ? '/business/SystemDevelop'
              : item.area_name === 'FMS 모니터링'
                ? '/business/FMSMonitoring'
                : item.area_name === '인프라 시스템'
                  ? '/business/InfrastructureSystem'
                  : item.area_name === '유지보수'
                    ? '/business/Maintenance'
                    : '#',
        }));
        setAreaData(processedData);
      } catch (err) {
        console.error('Error fetching business areas:', err);
        setErrorAreas('데이터를 불러오는 데 실패했습니다.');
      } finally {
        setLoadingAreas(false);
      }
    };
    fetchAreas();
  }, []);

  if (loadingClients || loadingAreas)
    return (
      <header id="header">
        <div className="banner-container">
          <img src="/AdobeStock_2.jpeg" alt="배너" className="banner-image" />
          <div className="hero-text-overlay">
            <h1 className="display-4">Welcome to ACE IT</h1>
            <p className="lead">FMS 시설물 모니터링, 전산실 구축 및 전문 솔루션 제공</p>
            <p>Loading...</p>
          </div>
        </div>
      </header>
    );

  if (errorClients || errorAreas)
    return (
      <header id="header">
        <div className="banner-container">
          <img src="/AdobeStock_2.jpeg" alt="배너" className="banner-image" />
          <div className="hero-text-overlay">
            <p>{errorClients || errorAreas}</p>
          </div>
        </div>
      </header>
    );

  return (
    <header id="header">
      <div className="banner-container">
        <img src="/AdobeStock_2.jpeg" alt="배너" className="banner-image" />
        <div className="animated-text-container">
          {/* 첫 번째 AnimatedText 컴포넌트: 상단 텍스트 */}
          <AnimatedText
            text={`FMS 시설물 모니터링 \n 전산실 구축 및 전문 솔루션 제공`}
            className="main-text top-text"

          />
        </div>
        <div className="hero-text-overlay">
        </div>
      </div>
      <section className="business-clients-section">
        <Swiper
          modules={[Autoplay, SwiperPagination, Navigation]}
          spaceBetween={20} /* 슬라이드 간 간격 */
          slidesPerView={5} /* 한 번에 보여줄 슬라이드 수 */
          autoplay={{
            delay: 1500, /* 자동 재생 시간 (ms) */
            disableOnInteraction: false, /* 사용자 상호작용 후 자동 재생 유지 */
            pauseOnMouseEnter: true, /* 마우스 호버 시 자동 재생 일시정지 */
          }}
          speed={200} /* 슬라이드 전환 속도 (ms) */
          loop /* 무한 반복 */
          freeMode={false}
          grabCursor={true}
          allowTouchMove={true}
          pagination={{ clickable: true }}
          breakpoints={{
            0: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 5,
              spaceBetween: 20,
            },
          }}
          style={{
            overflow: 'hidden',
            paddingBottom: '30px',
            bottom: '20px'
          }}
        >
          {clientData.map((client) => (
            <SwiperSlide key={client.id}>
              <div className="small-card">
                {client.client_logo_path && (
                  <img
                    src={`${API_SERVER_HOST}/${client.client_logo_path}`}
                    className="small-card-img"
                    alt={client.name}
                  />
                )}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </header>
  );
};

export default Header;
