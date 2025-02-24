import React from 'react';
import { motion } from 'framer-motion';
import './HeadBanner.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useLocation, Link } from 'react-router-dom';

// 애니메이션 설정
const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      when: 'beforeChildren',
      staggerChildren: 0.3,
    },
  },
};

const pageAnimate_1 = {
  initial: { y: 0, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  transition: { duration: 0.8 },
};

// 배너 텍스트 매핑
const bannerTextMapping = {
  '/contact': '문의 & 오시는 길',
  '/login': '관리자 페이지',
  '/admin': '관리자 페이지',
  '/informationList': '회사 소개 및 정보 목록',
  '/addInformation': '등록',
  '/editInformation': '수정',
  '/historyList': '회사 연혁 및 개발본부 이력',
  '/addHistory': '등록',
  '/editHistory': '수정',
  '/listBusinessClient': '주요 고객사 목록',
  '/addBusinessClient': '등록',
  '/editBusinessClient': '수정',
  '/companyVisionValuesList': '회사 비전 및 가치',
  '/addCompanyVisionValue': '등록',
  '/editCompanyVisionValue': '수정',
  '/listBusinessArea': '사업 영역(BUSINESS)',
  '/addBusinessArea': '등록',
  '/editBusinessArea': '수정',
  '/download': '자료실',
  '/about': '회사소개',
  '/about/OrganizationHistory': '조직도 & 개발이력',
  '/about/CompanyHistory': '연혁',
  '/business/SystemDevelop': '시스템 개발',
  '/business/FMSMonitoring': 'FMS 모니터링',
  '/business/InfrastructureSystem': '인프라 시스템',
  '/business/Maintenance': '유지보수',
};

// 하위 페이지 링크
const aboutPages = [
  { path: '/about', label: '회사소개' },
  { path: '/about/OrganizationHistory', label: '조직도 & 개발이력' },
  { path: '/about/CompanyHistory', label: '연혁' },
];

const businessPages = [
  { path: '/business/SystemDevelop', label: '시스템 개발' },
  { path: '/business/FMSMonitoring', label: 'FMS 모니터링' },
  { path: '/business/InfrastructureSystem', label: '인프라 시스템' },
  { path: '/business/Maintenance', label: '유지보수' },
];

const HeadBanner = () => {
  const location = useLocation();

  // 경로에서 동적 파라미터를 제거하고 기본 경로만 추출
  const extractBasePath = (pathname) => {
    const match = pathname.match(/^\/[a-zA-Z]+\/[a-zA-Z]+/);
    if (match) return match[0];
    const singleSegmentMatch = pathname.match(/^\/[a-zA-Z]+/);
    if (singleSegmentMatch) return singleSegmentMatch[0];
    return pathname;
  };

  // 추출된 경로를 통해 배너 텍스트 구하기
  const basePath = extractBasePath(location.pathname);
  const bannerText = bannerTextMapping[basePath] || '';

  // 사이드바 메뉴 아이템 렌더링
  const renderSideMenuItems = () => {
    // /about 경로라면 aboutPages 전부
    if (location.pathname.startsWith('/about')) {
      return aboutPages.map((page) => {
        const isActive = location.pathname === page.path; // 현재 페이지 여부
        return (
            <li key={page.path} className={isActive ? 'snb_on' : ''}>
              <Link to={page.path} className="business-link">
                {page.label}
              </Link>
            </li>
        );
      });
    }

    // /business 경로라면 businessPages 전부
    if (location.pathname.startsWith('/business')) {
      return businessPages.map((page) => {
        const isActive = location.pathname === page.path;
        return (
            <li key={page.path} className={isActive ? 'snb_on' : ''}>
              <Link to={page.path} className="business-link">
                {page.label}
              </Link>
            </li>
        );
      });
    }

    // 그 밖의 경로면 사이드바에 표시할 내용 없음
    return null;
  };

  return (
      <main id="sh_container">
        {/* 배너 영역 */}
        <div id="sub_bg">
          <div className="txt_area">
            <motion.div variants={pageAnimate_1}>
              <div className="head-banner-text-about">
                {bannerText}
              </div>
            </motion.div>
          </div>
        </div>

        {/* 콘텐츠 영역 */}
        <div id="sh_container_wrapper">
          <div id="sh_aside">
            <div id="sh_aside_wrapper">
              <ul id="sh_snb">
                {renderSideMenuItems()}
              </ul>
            </div>
          </div>
          {/* 여기부터 실제 메인 컨텐츠 */}
          {/* ... */}
        </div>
      </main>
  );
};

export default HeadBanner;
