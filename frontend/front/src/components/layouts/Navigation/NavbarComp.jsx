// NavbarComp.js
import React, {useEffect, useState} from 'react';
import {motion, AnimatePresence} from 'framer-motion';
import {Link, useLocation} from 'react-router-dom';
import './NavbarComp.css';
import {MenuToggle} from '../../MenuToggle';
import {Menu} from '../../Menu';

const NavbarComp = ({isVisible, isLoggedIn, onLogout}) => {
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [aboutMenuTimer, setAboutMenuTimer] = useState(null);

  const [isBusinessOpen, setIsBusinessOpen] = useState(false);
  const [businessMenuTimer, setBusinessMenuTimer] = useState(null);

  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // 경로가 변경될 때 메뉴를 닫음
  useEffect(() => {
    setIsOpen(false);
    setIsAboutOpen(false);
    setIsBusinessOpen(false);
  }, [location.pathname]);

  // 컴포넌트 언마운트 시 타이머 정리
  useEffect(() => {
    return () => {
      clearTimeout(aboutMenuTimer);
      clearTimeout(businessMenuTimer);
    };
  }, [aboutMenuTimer, businessMenuTimer]);

  const handleAboutMouseEnter = () => {
    clearTimeout(aboutMenuTimer);
    setIsAboutOpen(true);
  };

  const handleAboutMouseLeave = () => {
    const timer = setTimeout(() => setIsAboutOpen(false), 0); // 200ms 지연
    setAboutMenuTimer(timer);
  };

  const handleBusinessMouseEnter = () => {
    clearTimeout(businessMenuTimer);
    setIsBusinessOpen(true);
  };

  const handleBusinessMouseLeave = () => {
    const timer = setTimeout(() => setIsBusinessOpen(false), 0); // 200ms 지연
    setBusinessMenuTimer(timer);
  };

  // 메뉴 열림/닫힘을 토글하는 함수
  const toggleMenu = (isOpen) => {
    setIsOpen(isOpen);
  };

  const menuVariants = {
    open: {
      opacity: 1,
      height: 'auto',
      display: 'block',
      transition: {duration: 0.1},
    },
    closed: {
      opacity: 0,
      height: 0,
      transitionEnd: {display: 'none'},
      transition: {duration: 0.3},
    },
  };

  return (
    <div className="head-navi">
      {/* 네비게이션 바 */}
      <nav className={`navbar ${isVisible ? 'visible' : 'hidden'}`}>
        <div className="navbar-container">
          {/* 로고 영역 */}
          <div className="navbar-logo">
            <Link to="/">
              <img src="/aceit_logo.png" alt="Ace IT Logo" className="head-image"/>
            </Link>
          </div>

          {/* 메뉴 영역 */}
          <ul className="navbar-menu">
            <li className="navbar-item">
              <Link to="/" className="navbar-link">
                HOME
              </Link>
            </li>

            {/* ABOUT 메뉴 */}
            <li
                className="navbar-item"
                onMouseEnter={handleAboutMouseEnter}
                onMouseLeave={handleAboutMouseLeave}
            >
              <button className="navbar-link">ABOUT</button>
              <AnimatePresence>
                {isAboutOpen && (
                    <motion.ul
                        className="dropdown-menu-1"
                        initial="closed"
                        animate="open"
                        exit="closed"
                        variants={menuVariants}
                    >
                      <li className="dropdown-item">
                        <Link
                            to="/about"
                            className="dropdown-link"
                            onClick={() => setIsAboutOpen(false)}
                        >
                          회사소개
                        </Link>
                      </li>
                      <li className="dropdown-item">
                        <Link
                            to="/about/OrganizationHistory"
                            className="dropdown-link"
                            onClick={() => setIsAboutOpen(false)}
                        >
                          조직도 & 연혁
                        </Link>
                      </li>
                    </motion.ul>
                )}
              </AnimatePresence>
            </li>

            {/* BUSINESS 메뉴 */}
            <li
                className="navbar-item"
                onMouseEnter={handleBusinessMouseEnter}
                onMouseLeave={handleBusinessMouseLeave}
            >
              <button className="navbar-link">BUSINESS</button>
              <AnimatePresence>
                {isBusinessOpen && (
                    <motion.ul
                        className="dropdown-menu-1"
                        initial="closed"
                        animate="open"
                        exit="closed"
                        variants={menuVariants}
                    >
                      <li className="dropdown-item">
                        <Link
                            to="/business/SystemDevelop"
                            className="dropdown-link"
                            onClick={() => setIsBusinessOpen(false)}
                        >
                          시스템 개발
                        </Link>
                      </li>
                      <li className="dropdown-item">
                        <Link
                            to="/business/FMSMonitoring"
                            className="dropdown-link"
                            onClick={() => setIsBusinessOpen(false)}
                        >
                          FMS 모니터링
                        </Link>
                      </li>
                      <li className="dropdown-item">
                        <Link
                            to="/business/InfrastructureSystem"
                            className="dropdown-link"
                            onClick={() => setIsBusinessOpen(false)}
                        >
                          인프라 시스템
                        </Link>
                      </li>
                      <li className="dropdown-item">
                        <Link
                            to="/business/Maintenance"
                            className="dropdown-link"
                            onClick={() => setIsBusinessOpen(false)}
                        >
                          유지보수
                        </Link>
                      </li>
                    </motion.ul>
                )}
              </AnimatePresence>
            </li>

            <li className="navbar-item">
              <Link to="/contact" className="navbar-link">
                CONTACT US
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/download" className="navbar-link">
                DOWNLOAD
              </Link>
            </li>
          </ul>

          {/* 로그아웃 버튼 */}
          {isLoggedIn && (
              <button className="logout-button" onClick={onLogout}>
                LOGOUT
              </button>
          )}

        </div>
      </nav>

      {/* MenuToggle과 Menu를 네비게이션 바 밖으로 이동 */}
      <div
        className={`navbar-comp ${isOpen ? 'menu-open' : ''} ${
          isVisible ? 'visible' : 'hidden'
        }`}
      >
        <MenuToggle toggle={() => toggleMenu(!isOpen)} isOpen={isOpen}/>
        <Menu isOpen={isOpen} toggleMenu={toggleMenu}/>
      </div>
    </div>
  );
};

export default NavbarComp;

