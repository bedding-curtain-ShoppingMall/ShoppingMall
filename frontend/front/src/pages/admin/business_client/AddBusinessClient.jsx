import React, { useState, useRef } from 'react';
import { createBusinessClient } from '../../../api/AdminAPI';
import { useNavigate } from 'react-router-dom';
import './BusinessClient.css'; // CSS 파일 추가

const AddBusinessClient = () => {
    const [name, setName] = useState('');
    const [logo, setLogo] = useState(null);
    const [logoPreview, setLogoPreview] = useState(null);
    const navigate = useNavigate();
    const fileInputRef = useRef(null); // 파일 input에 대한 ref 추가

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('client_name', name);
        if (logo) {
            formData.append('client_logo', logo);
        }

        createBusinessClient(formData)
            .then(() => {
                navigate('/listBusinessClient');
            })
            .catch((error) => console.error('클라이언트 추가 중 오류 발생:', error));
    };

    const handleLogoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setLogo(file);
            setLogoPreview(URL.createObjectURL(file));
        }
    };

    const handleLogoRemove = () => {
        setLogo(null);
        setLogoPreview(null);
        fileInputRef.current.value = '';  // 파일 input 값 초기화 (파일명 사라짐)
    };

    return (
        <form onSubmit={handleSubmit} className="business-client-container">
            <input
                type="text"
                placeholder="클라이언트 이름"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <input
                type="file"
                onChange={handleLogoChange}
                accept="image/*"
                ref={fileInputRef}  // ref를 파일 input에 추가
            />
            {logoPreview && (
                <div>
                    <p>선택된 로고:</p>
                    <img src={logoPreview} alt="Logo Preview" width={200} />
                    <button type="button" onClick={handleLogoRemove}>이미지 삭제</button>
                </div>
            )}
            <div className="form-button-container">
                <button type="submit">등록</button>
                <button type="button" onClick={() => navigate('/listBusinessClient')}>목록으로 돌아가기</button>
            </div>
        </form>
    );
};

export default AddBusinessClient;
