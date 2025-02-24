// OrganizationHistory.jsx
import React, { Component } from 'react';
import './OrganizationHistory.css'; // CSS 파일 임포트
import 'bootstrap/dist/css/bootstrap.min.css';
import { motion } from 'framer-motion';
import { getHistory } from '../api/AdminAPI';

// 애니메이션 설정
const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.1,
      when: 'beforeChildren',
      staggerChildren: 0.05,
    },
  },
};

const rowVariants = {
  hidden: { opacity: 0, x: -50, backgroundColor: "rgba(255,255,255,0)" },
  visible: {
    opacity: 1,
    x: 0,
    backgroundColor: "rgba(255,255,255,1)",
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
};

export default class OrganizationHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      historyList: [],
      loading: true,
      error: null,
    };
  }

  componentDidMount() {
    getHistory()
        .then(response => {
          if (Array.isArray(response.data)) {
            this.setState({ historyList: response.data, loading: false });
          } else if (response.data.history && Array.isArray(response.data.history)) {
            this.setState({ historyList: response.data.history, loading: false });
          } else {
            console.error("API 응답 형식이 예상과 다릅니다:", response.data);
            this.setState({ error: "이력 데이터를 처리하는 중 오류가 발생했습니다.", loading: false });
          }
        })
        .catch(error => {
          console.error("이력 데이터를 가져오는 중 오류 발생:", error);
          this.setState({ error: "이력 데이터를 가져오는 데 실패했습니다.", loading: false });
        });
  }

  renderTable(title, data) {
    return (
        <div className="org-history-container" style={{ width: '100%' }}>
          <motion.table
              className="table table-striped table-hover"
              initial="hidden"
              animate="visible"
              variants={containerVariants}
          >
            <thead>
            <tr>
              <th scope="col" className="org-history-table-header">
                {title}
              </th>
            </tr>
            </thead>
            <tbody>
            {data && data.length > 0 ? (
                data.map((item, index) => (
                    <motion.tr
                        key={item.history_id || index}
                        variants={rowVariants}
                        className="table-row-gradient"
                    >
                      <td style={{ fontSize: '1.1rem' }}>{item.history_content}</td>
                    </motion.tr>
                ))
            ) : (
                <tr>
                  <td colSpan="3" className="text-center">데이터가 없습니다.</td>
                </tr>
            )}
            </tbody>
          </motion.table>
        </div>
    );
  }

  render() {
    const { historyList, loading, error } = this.state;

    if (loading) {
      return (
          <div className="text-center my-5">
            <div>로딩 중...</div>
          </div>
      );
    }

    if (error) {
      return (
          <div className="text-center my-5 text-danger">
            {error}
          </div>
      );
    }

    const companyHistory = historyList.filter(history => history.history_section_code === 1);
    const developmentHistory = historyList.filter(history => history.history_section_code === 2);

    const half = Math.ceil(developmentHistory.length / 2);
    const developmentHistoryFirstHalf = developmentHistory.slice(0, half);
    const developmentHistorySecondHalf = developmentHistory.slice(half);

    return (
        <div>
          <div className="container my-5">
            <motion.div
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
              <div className="org-title_comp_name">회사 조직도</div>
              <img
                  src="/organizationcharthistory.jpg"
                  alt="회사 조직도"
                  className="org-history-image img-fluid"
              />
            </motion.div>
          </div>

          <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
          >
            <div className="org-history-container">
              <div className="org-title_comp_name">ACE IT 연혁</div>
              {companyHistory.map((item, index) => (
                  <div className="timeline-item" key={index}>
                    <span className="history-year">{item.history_date.substring(0, 4)}</span>
                    <div className={`timeline-line ${index === companyHistory.length - 1 ? 'last' : ''}`}></div>
                    <div className="history-description">
                  <span>
                    <span className="history-content">
                      <strong>{item.history_content}</strong>
                    </span>
                  </span>
                    </div>
                  </div>
              ))}
            </div>

            <div className="container">
              <div className="row">
                <div className="col-12 col-md-6">
                  {this.renderTable("개발본부 이력", developmentHistoryFirstHalf)}
                </div>
                <div className="col-12 col-md-6">
                  {this.renderTable("개발본부 이력", developmentHistorySecondHalf)}

                </div>
              </div>
            </div>
          </motion.div>
        </div>
    );
  }
}
