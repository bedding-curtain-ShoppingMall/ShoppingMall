import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import './Download.css';
import { getAllDownloads, downloadFileById } from '../api/AdminAPI';

export default function Download() {
  // 고정된 탭 코드 (1, 2, 3)
  const tabCodes = [1, 2, 3];

  // 각 탭별 다운로드 데이터를 위한 상태 초기화
  const [downloadsByCode, setDownloadsByCode] = useState({
    1: [],
    2: [],
    3: []
  });

  // 기본 선택 탭은 첫 번째 탭
  const [selectedCode, setSelectedCode] = useState(tabCodes[0]);

  // 로딩 상태 관리 (초기 로딩 중)
  const [isLoading, setIsLoading] = useState(true);

  // 에러 발생 시 모달 노출을 위한 상태
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    getAllDownloads()
        .then((res) => {
          const allDownloads = res.data || [];
          const grouped = {
            1: [],
            2: [],
            3: []
          };

          // download_code가 1, 2, 또는 3인 항목만 그룹화
          allDownloads.forEach((item) => {
            const code = item.download_code;
            if (tabCodes.includes(code)) {
              grouped[code].push(item);
            }
          });

          setDownloadsByCode(grouped);
          setIsLoading(false); // 데이터 로드 완료
        })
        .catch((err) => {
          console.error('Failed to fetch download data:', err);
          setIsLoading(false); // 에러가 발생해도 로딩 상태 해제
          setShowModal(true);  // 에러 발생 시 모달 표시
        });
  }, []);

  // 모달이 표시되면 5초 후 자동으로 사라지도록 설정
  useEffect(() => {
    if (showModal) {
      const timer = setTimeout(() => setShowModal(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [showModal]);

  // 각 탭의 라벨 결정 (해당 탭의 첫 번째 항목의 download_name 사용)
  const getLabelForCode = (code) => {
  const labels = {
    1: '카다로그',
    2: '제품 소개서',
    3: '회사 소개서'
  };
  return labels[code] || `Tab ${code}`;
};

  // 다운로드 버튼 클릭 시 호출할 함수
// 다운로드 버튼 클릭 시
  const handleDownload = (downloadId) => {
    downloadFileById(downloadId)
        .then(response => {
          // Content-Disposition 헤더에서 파일명 추출
          const contentDisposition = response.headers['content-disposition'];
          let filename = 'downloaded_file';

          if (contentDisposition) {
            const matches = contentDisposition.match(/filename="(.+?)"/);
            if (matches?.length > 1) {
              filename = matches[1];
            }
          }

          // Blob 데이터를 이용해 임시 URL 생성 후 다운로드 트리거
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', filename);
          document.body.appendChild(link);
          link.click();
          link.remove();
        })
        .catch(error => {
          console.error('다운로드 요청 실패:', error);
          setShowModal(true);  // 다운로드 에러 발생 시 모달 표시
        });
  };

  // 로딩 중에는 탭과 고정 데이터를 보여주지 않고 로딩 화면만 출력
  if (isLoading) {
    return (
        <div className="loading-container">
          <p>Loading...</p>
          {/* 필요하다면 스피너 컴포넌트 등을 추가 */}
        </div>
    );
  }

  return (
      <>
        {/* 에러 발생 시 모달 표시 */}
        {showModal && (
            <div className="modal-container">
              업데이트 예정입니다
            </div>
        )}

        {/* 타이틀은 컨테이너와 별도로 배치 */}
        <div className="download-title">카탈로그 & 제품 사양서 & 인증서</div>

        <div className="download-container">
          {/* 탭 목록 */}
          <ul className="tab-list">
            {tabCodes.map((code) => (
                <motion.li
                    key={code}
                    onClick={() => setSelectedCode(code)}
                    className="tab-item"
                    animate={{
                      backgroundColor: code === selectedCode ? '#f0f0f0' : '#fff'
                    }}
                >
                  {getLabelForCode(code)}
                  {code === selectedCode && (
                      <motion.div
                          className="tab-underline"
                          layoutId="tab-underline"
                          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                  )}
                </motion.li>
            ))}
          </ul>

          {/* 탭 컨텐츠 영역 */}
          <div className="tab-content" style={{ width: '100%' }}>
            <AnimatePresence mode="wait">
              {selectedCode && (
                  <motion.div
                      key={selectedCode}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                  >
                    {/* 카드들을 감싸는 flex 컨테이너 */}
                    <div className="cards-container">
                      {(downloadsByCode[selectedCode] || []).map((download) => (
                          <div key={download.download_id} className="download-card">
                            {/* exam_image를 src에 사용 */}
                            <img
                                src={download.exam_image}
                                alt={download.download_name}
                                className="document-image"
                            />
                            <div className="document-title">{download.download_name}</div>
                            {/* 다운로드 버튼 */}
                            <button
                                className="download-button"
                                onClick={() => handleDownload(download.download_id)}
                            >
                              다운로드 받기
                            </button>
                          </div>
                      ))}
                    </div>
                  </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </>
  );
}
