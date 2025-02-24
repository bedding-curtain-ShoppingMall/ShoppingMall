import React, { useState, useEffect, useRef } from 'react';
import { getBusinessClientById, updateBusinessClient, API_SERVER_HOST } from '../../../api/AdminAPI';
import { useParams, useNavigate } from 'react-router-dom';
import './BusinessClient.css'; // CSS 파일 추가

const EditBusinessClient = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [logo, setLogo] = useState(null);
    const [currentLogoPath, setCurrentLogoPath] = useState('');
    const [logoPreview, setLogoPreview] = useState(null); // 이미지 미리보기 상태 추가
    const [deleteLogo, setDeleteLogo] = useState(false);
    const [loading, setLoading] = useState(true);
    const fileInputRef = useRef(null); // 파일 input에 대한 ref 추가

    useEffect(() => {
        getBusinessClientById(id)
            .then((response) => {
                const client = response.data;
                setName(client.client_name);
                setCurrentLogoPath(client.client_logo_path);
                setLoading(false);
            })
            .catch((error) => {
                console.error('클라이언트를 가져오는 중 오류 발생:', error);
                setLoading(false);
            });
    }, [id]);

    const handleLogoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setLogo(file);
            setLogoPreview(URL.createObjectURL(file));  // 선택한 파일 미리보기 URL 생성
        }
    };

    const handleLogoRemove = () => {
        setLogo(null);
        setLogoPreview(null);  // 미리보기 이미지 제거
        fileInputRef.current.value = '';  // 파일 input 값 초기화 (선택했던 파일명도 사라짐)
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('client_name', name);
        formData.append('delete_logo', deleteLogo);

        if (logo) {
            formData.append('client_logo', logo);
        }

        updateBusinessClient(id, formData)
            .then(() => {
                alert('클라이언트가 성공적으로 수정되었습니다.');
                navigate('/listBusinessClient');
            })
            .catch((error) => console.error('클라이언트 수정 중 오류 발생:', error));
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <form onSubmit={handleSubmit} className="business-client-container">
            <input
                type="text"
                placeholder="클라이언트 이름"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />

            {/* 현재 로고 보여주기 */}
            {currentLogoPath && (
                <div>
                    <p>현재 로고:</p>
                    <img src={`${API_SERVER_HOST}/${currentLogoPath}`} alt="Client Logo" width={200} />
                    <div>
                        <label>
                            <input
                                type="checkbox"
                                checked={deleteLogo}
                                onChange={(e) => setDeleteLogo(e.target.checked)}
                            />
                            기존 로고 삭제
                        </label>
                    </div>
                </div>
            )}

            {/* 새로운 이미지 선택 */}
            <input
                type="file"
                onChange={handleLogoChange}
                accept="image/*"
                ref={fileInputRef}  // ref를 파일 input에 추가
            />

            {/* 선택한 이미지 미리보기 */}
            {logoPreview && (
                <div>
                    <p>선택된 로고:</p>
                    <img src={logoPreview} alt="Logo Preview" width={200} />
                    <button type="button" onClick={handleLogoRemove}>이미지 삭제</button>
                </div>
            )}

            <div className="form-button-container">
                <button type="submit">수정</button>
                <button type="button" onClick={() => navigate('/listBusinessClient')}>목록으로 돌아가기</button>
            </div>
        </form>
    );
};

export default EditBusinessClient;
