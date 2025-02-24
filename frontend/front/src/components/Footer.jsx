import './Footer.css';
import React, {useEffect, useState} from 'react';
import {getInformation} from '../api/AdminAPI';

const Footer = () => {
  const [informationData, setInformationData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getContentByName = (name) => {
    const info = informationData?.find(item => item.information_name === name);
    return info ? info.information_content : '미등록';
  };

  useEffect(() => {
    getInformation()
      .then(response => {
        if (response.data.information && Array.isArray(response.data.information)) {
          setInformationData(response.data.information);
        } else {
          setError('Footer 데이터를 처리하는 중 오류가 발생했습니다.');
        }
        setLoading(false);
      })
      .catch(() => {
        setError('Footer 데이터를 가져오는 데 실패했습니다.');
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading footer...</div>;
  if (error) return <div>{error}</div>;
  if (!informationData) return <div>Footer 정보를 불러오지 못했습니다.</div>;

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Left Section */}
        <div className="footer-container-left">
          <div className="company-name">{getContentByName("회사명")}</div>
        </div>

        {/* Right Section */}
        <div className="footer-container-right">
          <div className="footer-info">
            <span>사업자번호: {getContentByName("사업자번호")}</span>
            <span>대표이사: {getContentByName("대표이사")}</span>
            <span>주소: {getContentByName("주소")}</span>
            <span>대표전화: {getContentByName("기본 연락처")}</span>
            <span>FAX: {getContentByName("FAX 번호")}</span>
            <p className="footer-copyright">
              Copyright © {new Date().getFullYear()} {getContentByName("회사명")} ALL RIGHTS RESERVED
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
