import React, { useEffect, useState } from 'react';
import { getHistory, deleteHistory } from '../../../api/AdminAPI';
import { useNavigate, useLocation } from 'react-router-dom';
import './History.css';
import AdminPage from "../AdminPage";

const HistoryList = () => {
    const [historyList, setHistoryList] = useState([]);
    const location = useLocation();
    const navigate = useNavigate();

    // 쿼리 매개변수에서 sectionCode를 가져와 초기 섹션을 설정
    const queryParams = new URLSearchParams(location.search);
    const initialSection = parseInt(queryParams.get('sectionCode'), 10) || 1;
    const [selectedSection, setSelectedSection] = useState(initialSection);

    useEffect(() => {
        getHistory()
            .then((response) => setHistoryList(response.data.history))
            .catch((error) => console.error('히스토리를 가져오는 중 오류 발생:', error));
    }, []);

    const handleDelete = (id) => {
        if (window.confirm('정말 삭제하시겠습니까?')) {
            deleteHistory(id)
                .then(() => setHistoryList((prev) => prev.filter((history) => history.history_id !== id)))
                .catch((error) => console.error('히스토리 삭제 중 오류 발생:', error));
        }
    };

    return (
      <div className="history-container">
          <button onClick={() => navigate('/admin')}>관리자 페이지로 돌아가기</button>

          <div className="section-buttons">
              <button onClick={() => setSelectedSection(1)} className={selectedSection === 1 ? 'active' : ''}>회사 연혁
              </button>
              <button onClick={() => setSelectedSection(2)} className={selectedSection === 2 ? 'active' : ''}>개발 본부 이력
              </button>
          </div>
          <div className="content-container">
              <AdminPage className="admin-page"/>
              <div>
                  <h3>{selectedSection === 1 ? '회사 연혁' : '개발 본부 이력'}</h3>
                  <button onClick={() => navigate(`/addHistory?sectionCode=${selectedSection}`)}>
                      {selectedSection === 1 ? '회사 연혁 추가' : '개발 본부 이력 추가'}
                  </button>
                  <table className="history-table">
                      <thead>
                      <tr>
                          <th>Id</th>
                          <th>날짜</th>
                          <th>내용</th>
                          <th>Actions</th>
                      </tr>
                      </thead>
                      <tbody>
                      {historyList
                        .filter(history => history.history_section_code === selectedSection)
                        .map((history) => (
                          <tr key={history.history_id}>
                              <td>{history.history_id}</td>
                              <td>{history.history_date}</td>
                              <td>{history.history_content}</td>
                              <td>
                                  <button
                                    onClick={() => navigate(`/editHistory/${history.history_id}?sectionCode=${selectedSection}`)}>수정
                                  </button>
                                  <button onClick={() => handleDelete(history.history_id)}>삭제</button>
                              </td>
                          </tr>
                        ))}
                      </tbody>
                  </table>
              </div>
          </div>
          </div>
          );
          };

          export default HistoryList;
