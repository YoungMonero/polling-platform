// src/components/Sidebar.js
import React from 'react';
import styles from './style.module.css';

const PollsSidebar = ({ addPoll, polls }) => {
  return (
    <aside className={styles.sidebar}>
      <button className={styles.addButton} onClick={addPoll}>
        + Add
      </button>
      <div className={styles.pollsList}>
        {polls.map((poll) => (
          <div key={poll.id} className={styles.pollItem}>
            {poll.question}
          </div>
        ))}
      </div>
    </aside>
  );
};

export default PollsSidebar;