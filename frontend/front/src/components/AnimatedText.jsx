// src/components/AnimatedText.jsx

import React from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

const AnimatedText = ({ text, className }) => {
  // 텍스트를 \n 기준으로 분할하여 줄바꿈을 처리
  const lines = text.split('\n');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // 각 문자 사이의 지연 시간
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: `0.25em`, color: '#23238a' }, // 초기 색상: 파란색
    visible: { opacity: 1, y: `0em`, color: '#FFFFFF' },    // 최종 색상: 흰색
  };

  return (
      <motion.p
          className={className}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ display: 'inherit', }} // 줄바꿈 시 inline-block 유지
      >
        {lines.map((line, lineIndex) => (
            <React.Fragment key={lineIndex}>
              {line.split('').map((char, index) => {
                // 공백은 애니메이션에서 제외
                if (char === ' ') {
                  return ' ';
                }
                return (
                    <motion.span key={index} variants={letterVariants}>
                      {char}
                    </motion.span>
                );
              })}
              {lineIndex !== lines.length - 1 && <br />} {/* 마지막 줄이 아니면 <br/> 추가 */}
            </React.Fragment>
        ))}
      </motion.p>
  );
};

AnimatedText.propTypes = {
  text: PropTypes.string.isRequired,
  className: PropTypes.string,
};

AnimatedText.defaultProps = {
  className: '',
};

export default AnimatedText;
