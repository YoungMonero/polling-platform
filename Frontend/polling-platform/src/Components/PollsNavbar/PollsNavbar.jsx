// src/components/Navbar.js
import React from 'react';
import styles from './style.module.css';

const PollsNavbar = ({ sessionName, creationDate, token }) => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarLeft}>
        <span className={styles.history}>History</span>
        <span className={styles.sessionName}>{sessionName}</span>
      </div>
      <div className={styles.navbarRight}>
        <span className={styles.date}>{creationDate}</span>
        <span className={styles.token}>{token}</span>
        <span className={styles.public}>Public</span>
        <div className={styles.personProfile}>👤 Profile</div>
      </div>
    </nav>
  );
};

export default PollsNavbar;