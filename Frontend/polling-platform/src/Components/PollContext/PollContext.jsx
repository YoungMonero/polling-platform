// src/components/MainContent.js
import React from 'react';
import styles from './style.module.css';

const PollContext = ({ currentPoll }) => {
  return (
    <main className={styles.mainContent}>
      <div className={styles.pollHeader}>
        <span className={styles.pollType}>{currentPoll.type}</span>
        <button className={styles.pollSettings}>⚙️ Poll settings</button>
      </div>
      <div className={styles.pollQuestion}>
        <input type="text" defaultValue={currentPoll.question} />
      </div>
      <div className={styles.pollOptions}>
        {currentPoll.options.map((option, index) => (
          <div key={index} className={styles.option}>
            <input type="text" defaultValue={option} />
            <span className={styles.votePercentage}>0%</span>
          </div>
        ))}
        <button className={styles.addOption}>+ Add option</button>
      </div>
      <div className={styles.untitledPoll}>
        <div className={styles.untitled}>Untitled</div>
        <div className={styles.votes}>0 votes</div>
      </div>
      <div className={styles.interactionSection}>
        <button className={styles.startInteraction}>Start Interaction</button>
        <span className={styles.interactionText}>Start an interaction to collect votes</span>
        <button className={styles.nextPoll}>Next Poll</button>
        <button className={styles.previewPoll}>Preview Poll</button>
        <button className={styles.viewParticipant}>👁️ View as participant</button>
      </div>
    </main>
  );
};

export default PollContext;