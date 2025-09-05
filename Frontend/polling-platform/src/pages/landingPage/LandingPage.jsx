import React from "react";
import styles from "./landingPage.module.css";


const LandingPage = () => {
    return (
        <div className={styles["main-container"]}>
            <div className={styles["side-img"]}>
                <img src="https://ctb.ku.edu/sites/default/files/chapter_files/participation.jpg" alt="landing" />
            </div>
            <div className={styles["right-side"]}>
                <div className={styles.logo}>
                    <img width="90" height="80" src="https://img.icons8.com/external-regular-kawalan-studio/24/external-statistic-user-interface-regular-kawalan-studio.png" alt="external-statistic-user-interface-regular-kawalan-studio" />
                </div>
                <h1 className={styles.title}>Pull Hub</h1>
                <p className={styles.text}>Real Time Pulling/Survey</p>
                <button className={styles.join}>Join Now</button>
            </div>
        </div>
    )
}

export default LandingPage;