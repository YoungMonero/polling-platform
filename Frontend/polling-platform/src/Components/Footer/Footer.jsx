import React from 'react'
import styles from "./styles.module.css";

const Footer = () => {
  return (
    <div>
        <footer>
            <div className={styles.container} >
                <div className={styles.footerContent}>
                    <p>&copy; 2023 PollHub - Real-Time Polling Platform</p>
                    <p>Hackathon Project</p>
                </div>
            </div>
        </footer> 
    </div>
  )
}

export default Footer
