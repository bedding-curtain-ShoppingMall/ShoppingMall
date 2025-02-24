// App.jsx
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios'; // axios 임포트
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Router from './router/Router';


function App() {
  // axios 기본 설정
  axios.defaults.baseURL = process.env.REACT_APP_SERVER; // 실제 백엔드 서버의 URL로 변경

  // 쿠키 설정이 필요하다면 여기서 진행합니다.
  // 예: document.cookie = "key=value; path=/;";

  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
}

export default App;
