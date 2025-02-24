import React, { useEffect, useState } from 'react';
import { getBusinessClients, deleteBusinessClient, API_SERVER_HOST } from '../../../api/AdminAPI';
import { useNavigate } from 'react-router-dom';
import './BusinessClient.css';
import AdminPage from "../AdminPage";

const BusinessClientList = () => {
    const [businessClients, setBusinessClients] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getBusinessClients()
            .then((response) => setBusinessClients(response.data.business_clients))
            .catch((error) => console.error('클라이언트를 가져오는 중 오류 발생:', error));
    }, []);

    const handleDelete = (id) => {
        if (window.confirm('정말 삭제하시겠습니까?')) {
            deleteBusinessClient(id)
                .then(() => setBusinessClients((prev) => prev.filter((client) => client.client_id !== id)))
                .catch((error) => console.error('클라이언트 삭제 중 오류 발생:', error));
        }
    };

    return (
      <div className="business-client-container">
        <div className="button-container">
          <button onClick={() => navigate('/addBusinessClient')}>클라이언트 추가</button>
          <button onClick={() => navigate('/admin')}>관리자 페이지로 돌아가기</button>
        </div>
        <div className="content-container">
          <AdminPage className="admin-page"/>
          <div className="business-client-grid">
            {businessClients.map((client) => (
              <div key={client.client_id} className="business-client-item">
                <h5>{client.client_name}</h5>
                {client.client_logo_path && (
                  <img src={`${API_SERVER_HOST}/${client.client_logo_path}`} alt={client.client_name}/>
                )}
                <div className="client-buttons">
                  <button onClick={() => navigate(`/editBusinessClient/${client.client_id}`)}>수정</button>
                  <button onClick={() => handleDelete(client.client_id)}>삭제</button>
                </div>
              </div>
            ))}
          </div>
          </div>
        </div>
        );
        };

        export default BusinessClientList;
