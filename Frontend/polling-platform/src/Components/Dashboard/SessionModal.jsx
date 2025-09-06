// SessionModal.jsx
import React, { useState } from 'react';
import { 
  Plus, 
  X, 
  Hash, 
  Calendar,
  Clock,
  Users,
  Settings,
  Copy,
  Check
} from 'lucide-react';
import styles from './SessionModal.module.css';

const SessionModal = ({ onClose, onSubmit }) => {
  const [sessionName, setSessionName] = useState('');
  const [sessionDate, setSessionDate] = useState(new Date().toISOString().split('T')[0]);
  const [sessionTime, setSessionTime] = useState('10:00');
  const [maxParticipants, setMaxParticipants] = useState('50');
  const [sessionCode, setSessionCode] = useState(generateSessionCode());
  const [isCreating, setIsCreating] = useState(false);
  const [codeCopied, setCodeCopied] = useState(false);

  function generateSessionCode() {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsCreating(true);
    
    // Simulate API call
    setTimeout(() => {
      const newSession = {
        name: sessionName || 'Untitled Session',
        date: sessionDate,
        time: sessionTime,
        code: sessionCode,
        maxParticipants: parseInt(maxParticipants),
        createdAt: new Date().toISOString()
      };
      
      onSubmit(newSession);
      setIsCreating(false);
      onClose();
    }, 1500);
  };

  const regenerateCode = () => {
    setSessionCode(generateSessionCode());
  };

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(sessionCode);
      setCodeCopied(true);
      setTimeout(() => setCodeCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={handleOverlayClick}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className={styles.modalHeader}>
          <div className={styles.headerLeft}>
            <h2>Create New Session</h2>
            <p>Set up your interactive polling session</p>
          </div>
          <button className={styles.modalClose} onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        
        {/* Modal Body */}
        <form onSubmit={handleSubmit} className={styles.modalForm}>
          {/* Session Name */}
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>
              <Settings size={16} />
              Session Name
            </label>
            <input
              type="text"
              value={sessionName}
              onChange={(e) => setSessionName(e.target.value)}
              placeholder="e.g., Quarterly Review Q&A"
              className={styles.formInput}
              required
            />
            <span className={styles.fieldHint}>Choose a descriptive name for your session</span>
          </div>
          
          {/* Date and Time Row */}
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>
                <Calendar size={16} />
                Session Date
              </label>
              <input
                type="date"
                value={sessionDate}
                onChange={(e) => setSessionDate(e.target.value)}
                className={styles.formInput}
                required
              />
            </div>
            
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>
                <Clock size={16} />
                Start Time
              </label>
              <input
                type="time"
                value={sessionTime}
                onChange={(e) => setSessionTime(e.target.value)}
                className={styles.formInput}
                required
              />
            </div>
          </div>
          
          {/* Max Participants */}
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>
              <Users size={16} />
              Maximum Participants
            </label>
            <select
              value={maxParticipants}
              onChange={(e) => setMaxParticipants(e.target.value)}
              className={styles.formInput}
            >
              <option value="25">25 participants</option>
              <option value="50">50 participants</option>
              <option value="100">100 participants</option>
              <option value="250">250 participants</option>
              <option value="500">500 participants</option>
              <option value="unlimited">Unlimited</option>
            </select>
            <span className={styles.fieldHint}>Set a limit to manage session size</span>
          </div>
          
          {/* Session Code */}
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>
              <Hash size={16} />
              Session Code
            </label>
            <div className={styles.codeContainer}>
              <div className={styles.codePreview}>
                <span className={styles.codeValue}>{sessionCode}</span>
                <div className={styles.codeActions}>
                  <button 
                    type="button" 
                    className={styles.codeButton} 
                    onClick={copyCode}
                    title="Copy code"
                  >
                    {codeCopied ? <Check size={16} /> : <Copy size={16} />}
                  </button>
                  <button 
                    type="button" 
                    className={styles.codeButton} 
                    onClick={regenerateCode}
                    title="Generate new code"
                  >
                    <Settings size={16} />
                  </button>
                </div>
              </div>
              {codeCopied && (
                <span className={styles.copySuccess}>Code copied to clipboard!</span>
              )}
            </div>
            <span className={styles.fieldHint}>Participants will use this code to join your session</span>
          </div>

          {/* Session Preview */}
          <div className={styles.sessionPreview}>
            <h4>Session Preview</h4>
            <div className={styles.previewCard}>
              <div className={styles.previewHeader}>
                <div className={styles.previewStatus}>
                  <div className={styles.statusDot}></div>
                  <span>Ready to Start</span>
                </div>
              </div>
              <h5>{sessionName || 'Untitled Session'}</h5>
              <div className={styles.previewDetails}>
                <div className={styles.previewDetail}>
                  <Calendar size={14} />
                  <span>{new Date(sessionDate).toLocaleDateString()}</span>
                </div>
                <div className={styles.previewDetail}>
                  <Clock size={14} />
                  <span>{sessionTime}</span>
                </div>
                <div className={styles.previewDetail}>
                  <Hash size={14} />
                  <span>{sessionCode}</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Modal Actions */}
          <div className={styles.modalActions}>
            <button 
              type="button" 
              className={styles.btnSecondary} 
              onClick={onClose}
              disabled={isCreating}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className={styles.btnPrimary} 
              disabled={isCreating}
            >
              {isCreating ? (
                <>
                  <div className={styles.spinner}></div>
                  Creating Session...
                </>
              ) : (
                <>
                  <Plus size={16} />
                  Create Session
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SessionModal;