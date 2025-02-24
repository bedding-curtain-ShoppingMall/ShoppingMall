// src/components/Menu.js
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import './Menu.css';
import './MenuToggle.css';

export function Menu({ isOpen, toggleMenu }) {
  const [isBusinessOpen, setIsBusinessOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isLoggedIn] = useState(!!localStorage.getItem("token"));

  useEffect(() => {
    if (isBusinessOpen) {
      setIsAboutOpen(false);
    }
  }, [isBusinessOpen]);

  useEffect(() => {
    if (isAboutOpen) {
      setIsBusinessOpen(false);
    }
  }, [isAboutOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.nav
          className="menu-container"
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%", opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30, duration: 0.3 }}
          whileHover={{ scale: 1 }}
          onPanEnd={(event, info) => {
            if (info.velocity.x > 100) {
              toggleMenu(false);
            }
          }}
        >
          <ul>
            <li>
              <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                HOME
              </Link>
            </li>

            {/* ABOUT Menu with Sub-Menu */}
            <li>
              <motion.button
                whileTap={{ scale: 1.07 }}
                onClick={() => setIsAboutOpen(!isAboutOpen)}
                style={{
                  textDecoration: 'none',
                  color: 'inherit',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  fontWeight: 'bold',
                }}
              >
                ABOUT
                <div className="arrow" style={{ transformOrigin: "50% 55%" }}>
                  <svg width="25" height="15" viewBox="0 5 20 20">
                    <path d="M0 7 L 20 7 L 10 16" />
                  </svg>
                </div>
              </motion.button>

              <AnimatePresence>
                {isAboutOpen && (
                  <motion.ul
                    className="dropdown-menu"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                  >
                    <li className="dropdown-item first-item">
                      <Link to="/about" className="dropdown-link">
                        회사소개
                      </Link>
                    </li>
                    <li className="dropdown-item last-item">
                      <Link to="/about/OrganizationHistory" className="dropdown-link">
                        조직도 & 연혁
                      </Link>
                    </li>
                  </motion.ul>
                )}
              </AnimatePresence>
            </li>

            {/* BUSINESS Dropdown */}
            <li>
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={() => setIsBusinessOpen(!isBusinessOpen)}
                style={{
                  textDecoration: 'none',
                  color: 'inherit',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  fontWeight: 'bold',
                }}
              >
                BUSINESS
                <div className="arrow" style={{ transformOrigin: "50% 55%" }}>
                  <svg width="25" height="15" viewBox="0 5 20 20">
                    <path d="M0 7 L 20 7 L 10 16" />
                  </svg>
                </div>
              </motion.button>

              <AnimatePresence>
                {isBusinessOpen && (
                  <motion.ul
                    className="dropdown-menu"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                  >
                    <li className="dropdown-item first-item">
                      <Link to="/business/SystemDevelop" className="dropdown-link">
                        시스템 개발
                      </Link>
                    </li>
                    <li className="dropdown-item">
                      <Link to="/business/FMSMonitoring" className="dropdown-link">
                        FMS 모니터링
                      </Link>
                    </li>
                    <li className="dropdown-item">
                      <Link to="/business/InfrastructureSystem" className="dropdown-link">
                        인프라 시스템
                      </Link>
                    </li>
                    <li className="dropdown-item last-item">
                      <Link to="/business/Maintenance" className="dropdown-link">
                        유지보수
                      </Link>
                    </li>
                  </motion.ul>
                )}
              </AnimatePresence>
            </li>

            <li>
              <Link to="/contact" style={{ textDecoration: 'none', color: 'inherit' }}>
                Contact Us
              </Link>
            </li>

            {/* 관리자 페이지 및 로그아웃: 로그인 상태일 때만 표시 */}
            {isLoggedIn && (
              <>
                <li>
                  <Link to="/admin" style={{ textDecoration: 'none', color: 'inherit' }}>
                    관리자 페이지
                  </Link>
                </li>
              </>
            )}
          </ul>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
