// src/components/MenuToggle.js
import React from 'react';
import { motion } from 'framer-motion';
import './MenuToggle.css';

export const MenuToggle = ({ isOpen, toggle }) => {
  const variant = isOpen ? 'opened' : 'closed';

  return (
    <button onClick={toggle} className={`menu-toggle ${isOpen ? 'menu-open' : ''}`}>
      <svg className="toggle-icon" width="100%" height="100%" viewBox="0 0 30 30">
        <motion.path
          className="top"
          fill="transparent"
          strokeWidth="2"
          stroke="#000"
          strokeLinecap="round"
          animate={variant}
          variants={{
            closed: { d: 'M 3 6 L 27 6' },
            opened: { d: 'M 5 25 L 25 5' },
          }}
          style={{ transformOrigin: 'center' }}
        />
        <motion.path
          className="middle"
          fill="transparent"
          strokeWidth="2"
          stroke="#000"
          strokeLinecap="round"
          d="M 3 15 L 27 15"
          animate={variant}
          variants={{
            closed: { opacity: 1 },
            opened: { opacity: 0 },
          }}
          style={{ transformOrigin: 'center' }}
        />
        <motion.path
          className="bottom"
          fill="transparent"
          strokeWidth="2"
          stroke="#000"
          strokeLinecap="round"
          animate={variant}
          variants={{
            closed: { d: 'M 3 24 L 27 24' },
            opened: { d: 'M 5 5 L 25 25' },
          }}
          style={{ transformOrigin: 'center' }}
        />
      </svg>
    </button>
  );
};

