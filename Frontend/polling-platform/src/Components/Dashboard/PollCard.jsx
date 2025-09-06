// PollCard.jsx
import React from 'react';
import { 
  Play, 
  Pause, 
  Edit3, 
  Eye, 
  Download 
} from 'lucide-react';
import styles from './PollCard.module.css';

const PollCard = ({ 
  status, 
  question, 
  results, 
  onClose, 
  onHideResults, 
  onPublish, 
  onEdit, 
  onReopen, 
  onExport 
}) => {
  const getStatusClass = (status) => {
    switch (status) {
      case 'published': return styles.published;
      case 'draft': return styles.draft;
      case 'closed': return styles.closed;
      default: return styles.draft;
    }
  };

  return (
    <div className={styles.pollCard}>
      <div className={`${styles.pollStatusBadge} ${getStatusClass(status)}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </div>
      
      <h3 className={styles.pollQuestion}>{question}</h3>
      
      {results && (
        <div className={styles.pollResults}>
          {results.map((result, index) => (
            <div key={index} className={styles.resultBar}>
              <div className={styles.resultLabel}>{result.label}</div>
              <div className={styles.resultProgress}>
                <div 
                  className={styles.resultFill} 
                  style={{ width: `${result.percentage}%` }}
                ></div>
              </div>
              <span className={styles.resultPercentage}>{result.percentage}%</span>
            </div>
          ))}
        </div>
      )}
      
      {status === 'draft' && !results && (
        <p className={styles.pollDraftText}>This poll hasn't been published yet.</p>
      )}
      
      <div className={styles.pollActions}>
        {status === 'published' && (
          <>
            <button className={styles.btnDanger} onClick={onClose}>
              <Pause size={16} />
              Close Poll
            </button>
            <button className={styles.btnOutline} onClick={onHideResults}>
              <Eye size={16} />
              Hide Results
            </button>
          </>
        )}
        
        {status === 'draft' && (
          <>
            <button className={styles.btnSuccess} onClick={onPublish}>
              <Play size={16} />
              Publish
            </button>
            <button className={styles.btnOutline} onClick={onEdit}>
              <Edit3 size={16} />
              Edit
            </button>
          </>
        )}
        
        {status === 'closed' && (
          <>
            <button className={styles.btnPrimary} onClick={onReopen}>
              <Play size={16} />
              Reopen
            </button>
            <button className={styles.btnOutline} onClick={onExport}>
              <Download size={16} />
              Export
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default PollCard;