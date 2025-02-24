import axios from 'axios';

export const API_SERVER_HOST = process.env.REACT_APP_API_SERVER_HOST;
// export const API_SERVER_HOST = 'http://localhost:8000/api'

const informationAPI = axios.create({
    baseURL: `${API_SERVER_HOST}/information`,
});

export const getInformation = () => informationAPI.get('');
export const getInformationById = (id) => informationAPI.get(`/${id}`);
export const createInformation = (data) => informationAPI.post('', data);
export const updateInformation = (id, data) => informationAPI.patch(`/${id}`, { request: data });
export const deleteInformation = (id) => informationAPI.delete(`/${id}`);


const historyAPI = axios.create({
    baseURL: `${API_SERVER_HOST}/history`,
});

export const getHistory = () => historyAPI.get('');
export const getHistoryBySection = (sectionCode) => historyAPI.get(`/section_code/${sectionCode}`);
export const getHistoryById = (id) => historyAPI.get(`/id/${id}`);
export const createHistory = (data) => historyAPI.post('', data);
export const updateHistory = (id, data) => historyAPI.patch(`/${id}`, { request: data });
export const deleteHistory = (id) => historyAPI.delete(`/${id}`);


const clientAPI = axios.create({
    baseURL: `${API_SERVER_HOST}/businessClient`,
});

export const getBusinessClients = () => clientAPI.get('');
export const getBusinessClientById = (id) => clientAPI.get(`/${id}`);
export const createBusinessClient = (data) => clientAPI.post('', data, {
    headers: { 'Content-Type': 'multipart/form-data' },
});
export const updateBusinessClient = (id, data) => clientAPI.patch(`/${id}`, data, {
    headers: { 'Content-Type': 'multipart/form-data' },
});
export const deleteBusinessClient = (id) => clientAPI.delete(`/${id}`);


const vvAPI = axios.create({
    baseURL: `${API_SERVER_HOST}/companyVisionValues`,
});

export const getCompanyVisionValues = () => vvAPI.get('');
export const getCompanyVisionValueById = (id) => vvAPI.get(`/${id}`);
export const createCompanyVisionValue = (data) => vvAPI.post('', data);
export const updateCompanyVisionValue = (id, data) => vvAPI.patch(`/${id}`, data);
export const deleteCompanyVisionValue = (id) => vvAPI.delete(`/${id}`);


const areaAPI = axios.create({
    baseURL: `${API_SERVER_HOST}/businessArea`,
});

export const getBusinessAreas = () => areaAPI.get('');
export const getBusinessAreaById = (id) => areaAPI.get(`/${id}`);
export const createBusinessArea = (data) => areaAPI.post('', data);
export const updateBusinessArea = (id, data) => areaAPI.patch(`/${id}`, data);
export const deleteBusinessArea = (id) => areaAPI.delete(`/${id}`);


const inquiryAPI = axios.create({
    baseURL: `${API_SERVER_HOST}/inquiry`
});

export const sendInquiry = (data) => inquiryAPI.post('', data);


const loginAPI = axios.create({
    baseURL: `${API_SERVER_HOST}/login`
});

export const token = (data) => loginAPI.post('/token', data);

const downloadAPI = axios.create({
    baseURL: `${API_SERVER_HOST}/download`,
});

// 다운로드 목록 API 호출 (메타데이터를 백엔드 API로부터 가져오는 경우)
export function getAllDownloads() {
    return downloadAPI.get('');
}

// 파일 다운로드: downloadAPI 인스턴스를 사용하여 호출 (최종 URL: `${API_SERVER_HOST}/download/file/{downloadId}`)
export function downloadFileById(downloadId) {
    return downloadAPI.get(`/file/${downloadId}`, {
        responseType: 'blob', // Blob 타입으로 받아야 파일 다운로드 가능
    });
}
