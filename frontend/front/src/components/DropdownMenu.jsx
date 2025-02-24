// DropdownMenu.jsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import './Menu.css';

const dropdownVariants = {
  open: {
    opacity: 1,
    clipPath: "inset(0% 0% 0% 0% round 10px)",
    transition: {
      type: "spring",
      bounce: 0,
      duration: 0.5,
      staggerChildren: 0.1,
      when: "beforeChildren",
    },
  },
  closed: {
    opacity: 0,
    clipPath: "inset(10% 50% 90% 50% round 10px)",
    transition: {
      type: "spring",
      bounce: 0,
      duration: 0.5,
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
};

const itemVariants = {
  open: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.2,
    },
  },
  closed: {
    opacity: 0,
    scale: 0.3,
    filter: "blur(20px)",
    transition: {
      duration: 0.2,
    },
  },
};

export function DropdownMenu({ isOpen }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.ul
          className="dropdown-menu"
          variants={dropdownVariants}
          initial="closed"
          animate="open"
          exit="closed"
        >
          <motion.li className="dropdown-item" variants={itemVariants}>
            <Link to="/business/service1" className="dropdown-link">
              Service 1
            </Link>
          </motion.li>
          <motion.li className="dropdown-item" variants={itemVariants}>
            <Link to="/business/service2" className="dropdown-link">
              Service 2
            </Link>
          </motion.li>
          <motion.li className="dropdown-item" variants={itemVariants}>
            <Link to="/business/service3" className="dropdown-link">
              Service 3
            </Link>
          </motion.li>
        </motion.ul>
      )}
    </AnimatePresence>
  );
}
