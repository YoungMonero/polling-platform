// src/App.js
import React, { useState, useEffect } from 'react';
import styles from './style.module.css';
import PollsNavbar from '../../Components/PollsNavbar/PollsNavbar';
import PollsSidebar from '../../Components/PollsSidebar/Pollssidebar';
import PollContext from '../../Components/PollContext/PollContext';


function PollPage() {
  const [sessionName, setSessionName] = useState('My Interactions');
  const [creationDate, setCreationDate] = useState('');
  const [token, setToken] = useState('');
  const [polls, setPolls] = useState([]);
  const [currentPoll, setCurrentPoll] = useState({
    type: 'Multiple choice',
    question: 'What would you like to ask?',
    options: ['Option 1', 'Option 2'],
  });

  useEffect(() => {
    const currentDate = new Date().toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
    setCreationDate(currentDate);

    const generatedToken = Math.floor(100000 + Math.random() * 900000);
    setToken(`#${generatedToken}`);
  }, []);

  const addPoll = () => {
    const newPoll = {
      id: polls.length + 1,
      type: 'Multiple choice',
      question: 'Untitled',
      options: [],
    };
    setPolls([...polls, newPoll]);
    setCurrentPoll(newPoll);
  };

  return (
    <div className={styles.app}>
      <PollsNavbar
        sessionName={sessionName}
        creationDate={creationDate}
        token={token}
      />
      <div className={styles.content}>
        <PollsSidebar addPoll={addPoll} polls={polls} />
        <PollContext currentPoll={currentPoll} />
      </div>
    </div>
  );
}

export default PollPage;