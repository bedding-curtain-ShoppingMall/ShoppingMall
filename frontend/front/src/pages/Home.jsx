import React, {useEffect} from 'react';
import Header from "../components/Header";
import Introduction from "../pages/Introduction";
import './Home.css';

const Home = () => {

  useEffect(() => {
    // 뷰포트 높이 계산 함수
    const setVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    // 초기 실행 및 리사이즈 이벤트 리스너 등록
    setVh();
    window.addEventListener('resize', setVh);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener('resize', setVh);
    };
  }, []);

  return (
    <>
      {/* ReactFullpage Wrapper 내부는 섹션 관리 */}
      <Header/>
      <div className="section">
        <div>
          <Introduction/>
        </div>
      </div>
    </>
  );
};

export default Home;
