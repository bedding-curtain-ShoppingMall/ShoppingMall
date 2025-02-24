// src/pages/admin/information/InformationList.js
import React, { useEffect, useState } from 'react';
import { getInformation, deleteInformation } from '../../../api/AdminAPI';
import { useNavigate } from 'react-router-dom';
import './Information.css'; // 공통 스타일 파일 추가
import AdminPage from '../AdminPage';

const InformationList = () => {
    const [informationList, setInformationList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getInformation()
          .then((response) => setInformationList(response.data.information))
          .catch((error) => console.error('정보를 가져오는 중 오류 발생:', error));
    }, []);

    const handleDelete = (id) => {
        if (window.confirm('정말 삭제하시겠습니까?')) {
            deleteInformation(id)
              .then(() => setInformationList((prev) => prev.filter((info) => info.information_id !== id)))
              .catch((error) => console.error('정보 삭제 중 오류 발생:', error));
        }
    };

    return (
      <div className="information-container">
          <div className="button-container">
              <button onClick={() => navigate('/addInformation')}>정보 추가</button>
              <button onClick={() => navigate('/admin')}>관리자 페이지로 돌아가기</button>
          </div>
          <div className="content-container">
              <AdminPage className="admin-page" />
              <table className="information-table">
                  <thead>
                  <tr>
                      <th>Id</th>
                      <th>항목</th>
                      <th>내용</th>
                      <th>Actions</th>
                  </tr>
                  </thead>
                  <tbody>
                  {informationList.map((info) => (
                    <tr key={info.information_id}>
                        <td>{info.information_id}</td>
                        <td>{info.information_name}</td>
                        <td>{info.information_content}</td>
                        <td>
                            <button onClick={() => navigate(`/editInformation/${info.information_id}`)}>수정</button>
                            <button onClick={() => handleDelete(info.information_id)}>삭제</button>
                        </td>
                    </tr>
                  ))}
                  </tbody>
              </table>
          </div>
      </div>
    );
};

export default InformationList;
