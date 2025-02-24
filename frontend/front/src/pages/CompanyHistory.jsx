import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { getHistory } from '../api/AdminAPI';
import './CompanyHistory.css';

const CompanyHistory = () => {
  const [companyHistory, setCompanyHistory] = useState([]);

  // AOS 초기화 (최소 변경)
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  useEffect(() => {
    getHistory()
        .then((res) => {
          if (!res.data) return;
          let histories = Array.isArray(res.data)
              ? res.data
              : res.data.history || [];

          // history_section_code가 1인 항목만 사용
          histories = histories.filter((h) => h.history_section_code === 1);

          // 날짜 기준 내림차순 정렬 (최신 항목이 먼저)
          histories.sort(
              (a, b) => new Date(b.history_date) - new Date(a.history_date)
          );

          setCompanyHistory(histories);
        })
        .catch((err) => console.error('회사 연혁 로드 오류:', err));
  }, []);

  // ----------- 연도별로 그룹화 -----------
  // 예: { '2020': [{history_id, history_date, ...}, ...], '2019': [...], ... }
  const groupedHistory = companyHistory.reduce((acc, item) => {
    const dateObj = new Date(item.history_date);
    const year = dateObj.getFullYear();
    // 월, 일 포맷 맞추기 (예: 01.03. 처럼 보이도록)
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');

    if (!acc[year]) {
      acc[year] = [];
    }

    acc[year].push({
      id: item.history_id,
      year,
      monthDay: `${month}.${day}`,
      title: item.history_title,
      content: item.history_content,
    });

    return acc;
  }, {});

  // 연도를 내림차순으로 정렬
  const sortedYears = Object.keys(groupedHistory).sort(
      (a, b) => Number(b) - Number(a)
  );

  return (
      <div className="history-wrapper">
        {/* 실제 연혁 본문 */}
        <div className="history-wrap">
          {/* 중앙 세로선 */}
          <span className="history-line"></span>

          {sortedYears.map((year, index) => {
            // index가 짝수면 우측(history-right), 홀수면 좌측(history-left) 배치
            const sideClass = index % 2 === 0 ? 'history-right' : 'history-left';
            // 원래 컨테이너에 적용했던 애니메이션 대신, 아래의 history-content에 적용
            const aosAnimation = index % 2 === 0 ? 'fade-right' : 'fade-left';

            return (
                <div key={year} className={sideClass}>
                  <span className="line"></span>
                  <span className="red-point"></span>
                  <h3 className="year">{year}</h3>

                  {/* 아래의 내용만 움직이도록 별도 래퍼에 AOS 적용 */}
                  <div className="history-content" data-aos={aosAnimation}>
                    {groupedHistory[year].map((hist) => (
                        <div
                            key={hist.id}
                            className="month"
                            data-aos="fade-up"
                            data-aos-delay="100"
                        >
                          {/* 날짜 + 타이틀 (day 뒤에 . 제거) */}
                          <strong>{hist.monthDay} </strong>
                          {hist.title}
                          <br />
                          {/* 내용 */}
                          {hist.content && <>&nbsp;&nbsp;&nbsp;{hist.content}</>}
                        </div>
                    ))}
                  </div>
                </div>
            );
          })}
        </div>
      </div>
  );
};

export default CompanyHistory;
