import React from 'react'
import styles from "./styles.module.css";

const Session = () => {
  return (
    <div>
      <div className={styles.card}>
        <div className={styles.cardHeader}>
            <h2 className={styles.cardTitle}>Join as Participant</h2>
        </div>
        <div className={styles.card}>
          <div className={styles.cardBody}>
            <form id="join-form">
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Session Code</label>
                <input 
                  type="text" 
                  className={styles.formControl} 
                  id="session-code" 
                  placeholder="Enter session code" 
                  required 
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel} htmlFor="participant-name">Your Name</label>
                <input 
                  type="text" 
                  className={styles.formControl} 
                  id="participant-name" 
                  placeholder="Enter your name" 
                  required 
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel} htmlFor="participant-email">Email (optional)</label>
                <input 
                  type="email" 
                  className={styles.formControl} 
                  id="participant-email" 
                  placeholder="Enter your email" 
                />
              </div>
              <div className={styles.btn}>
                <button type="submit" className={styles.btnOutline}>Join Session</button>
              </div>   
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Session