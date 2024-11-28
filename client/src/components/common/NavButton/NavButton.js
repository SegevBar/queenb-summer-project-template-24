import React from 'react';
import styles from './NavButton.module.css';

const NavButton = ({ children, onClick, disabled }) => {
  return (
    <button
      className={styles.button}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default NavButton;