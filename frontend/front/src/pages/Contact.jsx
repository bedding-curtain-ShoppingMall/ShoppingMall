import React, { Component } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { motion } from 'framer-motion'; // framer-motion 임포트
import { getInformation, sendInquiry } from '../api/AdminAPI'; // Footer와 동일하게 API 호출 사용
import './Contact.css'; // CSS 파일 임포트

const containerStyle = {
  width: '100%',
  height: '400px',
  margin: '0 auto',
};

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      when: 'beforeChildren',
      staggerChildren: 0.3,
    },
  },
};

export default class Contact extends Component {
  state = {
    informationData: null,
    loading: true,
    error: null,
    name: '',
    call_num: '',
    email: '',
    message: '',
  };

  componentDidMount() {
    this.fetchInformation();
  }

  fetchInformation = async () => {
    try {
      const response = await getInformation();
      if (response.data.information && Array.isArray(response.data.information)) {
        this.setState({ informationData: response.data.information, loading: false });
      } else {
        throw new Error('정보를 가져오는 데 실패했습니다.');
      }
    } catch (error) {
      this.setState({ error: '정보를 가져오는 데 실패했습니다.', loading: false });
    }
  };

  getContentByName = (name) => {
    const { informationData } = this.state;
    const info = informationData?.find((item) => item.information_name === name);
    return info ? info.information_content : '미등록';
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const inquiryData = {
      message: {
        inquiry_writer: this.state.name,
        inquiry_writer_email: this.state.email,
        inquiry_writer_contact_number: this.state.call_num,
        inquiry_details: this.state.message,
      },
    };

    try {
      await sendInquiry(inquiryData);
      alert('문의가 성공적으로 전송되었습니다.');
      this.setState({
        name: '',
        call_num: '',
        email: '',
        message: '',
      });
    } catch (error) {
      alert('문의 전송 중 오류가 발생했습니다.');
      console.error(error);
    }
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { loading, error } = this.state;

    if (loading) {
      return <div>Loading contact information...</div>;
    }

    if (error) {
      return <div>{error}</div>;
    }

    return (
      <div>
        <motion.div initial="hidden" animate="visible" variants={containerVariants}>
          <div className="google-map-container">
            <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
              <GoogleMap mapContainerStyle={containerStyle} center={{
                lat: parseFloat(this.getContentByName('지도 위도')) || 37.2332754174924,
                lng: parseFloat(this.getContentByName('지도 경도')) || 127.023471864064
              }} zoom={15}>
                <Marker position={{
                  lat: parseFloat(this.getContentByName('지도 위도')) || 37.2332754174924,
                  lng: parseFloat(this.getContentByName('지도 경도')) || 127.023471864064
                }} />
              </GoogleMap>
            </LoadScript>
          </div>
          <motion.section className="contact-container" initial="hidden" animate="visible" variants={containerVariants}>
            <article className="waytocome-item_title">
              <dt>{this.getContentByName('회사명')}</dt>
              <dd className="waytocome-address">
                <span>{this.getContentByName('주소')}</span>
              </dd>
            </article>
            <article className="waytocome-item_callnum">
              <dt>전화</dt>
              <dd>{this.getContentByName('기본 연락처')}</dd>
            </article>
            <article className="waytocome-item_fax">
              <dt>팩스</dt>
              <dd>{this.getContentByName('FAX 번호')}</dd>
            </article>
            <article className="waytocome-item-email">
              <dt>이메일</dt>
              <dd>{this.getContentByName('이메일')}</dd>
            </article>
          </motion.section>
          <motion.section className="email-form" initial="hidden" animate="visible" variants={containerVariants}>
            <h3>문의하기</h3>
            <form onSubmit={this.handleSubmit}>
              <label htmlFor="name">이름</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="이름을 입력하세요"
                value={this.state.name}
                onChange={this.handleChange}
                required
              />

              <label htmlFor="call_num">연락처</label>
              <input
                type="text"
                id="call_num"
                name="call_num"
                placeholder="연락처를 입력하세요"
                value={this.state.call_num}
                onChange={this.handleChange}
                required
              />

              <label htmlFor="email">이메일</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="이메일을 입력하세요"
                value={this.state.email}
                onChange={this.handleChange}
                required
              />

              <label htmlFor="message">메시지</label>
              <textarea
                id="message"
                name="message"
                rows="5"
                placeholder="메시지를 입력하세요"
                value={this.state.message}
                onChange={this.handleChange}
                required
              />

              <button type="submit">보내기</button>
            </form>
          </motion.section>
        </motion.div>
      </div>
    );
  }
}
