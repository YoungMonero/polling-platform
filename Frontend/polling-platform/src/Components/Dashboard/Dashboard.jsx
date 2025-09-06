// Dashboard.jsx
import React, { useState } from 'react';
import { 
  Plus, 
  Users, 
  BarChart3, 
  Clock, 
  Play, 
  Pause, 
  Edit3, 
  Eye, 
  Download, 
  Calendar,
  Hash,
  Settings,
  ChevronRight,
  Activity,
  TrendingUp
} from 'lucide-react';
import PollCard from './PollCard';
import SessionModal from './SessionModal';
import styles from './styles.module.css';

const Dashboard = () => {
  const [sessions, setSessions] = useState([
    {
      id: 1,
      name: "Webinar Q&A",
      code: "ABC123",
      status: "active",
      participants: 45,
      polls: 3,
      date: "2025-09-06"
    }
  ]);
  const [showModal, setShowModal] = useState(false);
  const [selectedSession, setSelectedSession] = useState(null);

  const handleCreateSession = () => {
    setShowModal(true);
  };

  const handleSessionClick = (session) => {
    setSelectedSession(session);
    // Navigate to poll page logic would go here
    console.log('Navigating to poll page for session:', session);
  };

  const addNewSession = (sessionData) => {
    const newSession = {
      id: Date.now(),
      ...sessionData,
      status: 'active',
      participants: 0,
      polls: 0
    };
    setSessions([...sessions, newSession]);
  };

  return (
    <div className={styles.dashboard}>
      {/* Header */}
      <header className={styles.dashboardHeader}>
        <div className={styles.headerContent}>
          <div className={styles.headerLeft}>
            <h1 className={styles.dashboardTitle}>
              <Activity className={styles.titleIcon} />
              Poll Master
            </h1>
            <p className={styles.dashboardSubtitle}>Create engaging real-time polls</p>
          </div>
          <div className={styles.headerRight}>
            <div className={styles.userProfile}>
              <div className={styles.profileAvatar}>JD</div>
              <div className={styles.profileInfo}>
                <span className={styles.profileName}>John Doe</span>
                <span className={styles.profileRole}>Host</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className={styles.dashboardContent}>
        {/* Stats Overview */}
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={`${styles.statIcon} ${styles.activeBg}`}>
              <Activity />
            </div>
            <div className={styles.statInfo}>
              <h3>{sessions.filter(s => s.status === 'active').length}</h3>
              <p>Active Sessions</p>
            </div>
          </div>
          <div className={styles.statCard}>
            <div className={`${styles.statIcon} ${styles.participantsBg}`}>
              <Users />
            </div>
            <div className={styles.statInfo}>
              <h3>{sessions.reduce((total, session) => total + session.participants, 0)}</h3>
              <p>Total Participants</p>
            </div>
          </div>
          <div className={styles.statCard}>
            <div className={`${styles.statIcon} ${styles.pollsBg}`}>
              <BarChart3 />
            </div>
            <div className={styles.statInfo}>
              <h3>{sessions.reduce((total, session) => total + session.polls, 0)}</h3>
              <p>Total Polls</p>
            </div>
          </div>
          <div className={styles.statCard}>
            <div className={`${styles.statIcon} ${styles.growthBg}`}>
              <TrendingUp />
            </div>
            <div className={styles.statInfo}>
              <h3>92%</h3>
              <p>Engagement Rate</p>
            </div>
          </div>
        </div>

        {/* Sessions Section */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2>Your Sessions</h2>
            <button className={styles.btnPrimary} onClick={handleCreateSession}>
              <Plus size={20} />
              Create Session
            </button>
          </div>

          {sessions.length === 0 ? (
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}>
                <Users size={64} />
              </div>
              <h3>No sessions yet</h3>
              <p>Create your first session to start engaging with your audience</p>
              <button className={`${styles.btnPrimary} ${styles.large}`} onClick={handleCreateSession}>
                <Plus size={20} />
                Create Your First Session
              </button>
            </div>
          ) : (
            <div className={styles.sessionsGrid}>
              {sessions.map(session => (
                <div 
                  key={session.id} 
                  className={styles.sessionCard}
                  onClick={() => handleSessionClick(session)}
                >
                  <div className={styles.sessionHeader}>
                    <div className={styles.sessionStatus}>
                      <div className={`${styles.statusDot} ${styles[session.status]}`}></div>
                      <span className={`${styles.statusLabel} ${styles[session.status]}`}>
                        {session.status.charAt(0).toUpperCase() + session.status.slice(1)}
                      </span>
                    </div>
                    <button className={styles.sessionMenu} onClick={(e) => e.stopPropagation()}>
                      <Settings size={16} />
                    </button>
                  </div>
                  
                  <h3 className={styles.sessionName}>{session.name}</h3>
                  
                  <div className={styles.sessionCode}>
                    <Hash size={16} />
                    <span>Code: <strong>{session.code}</strong></span>
                  </div>
                  
                  <div className={styles.sessionStats}>
                    <div className={styles.sessionStat}>
                      <Users size={16} />
                      <span>{session.participants} participants</span>
                    </div>
                    <div className={styles.sessionStat}>
                      <BarChart3 size={16} />
                      <span>{session.polls} polls</span>
                    </div>
                    <div className={styles.sessionStat}>
                      <Calendar size={16} />
                      <span>{new Date(session.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                  
                  <div className={styles.sessionActions}>
                    <button className={styles.btnOutline} onClick={(e) => {
                      e.stopPropagation();
                      console.log('View participants for session:', session.id);
                    }}>
                      <Eye size={16} />
                      View Participants
                    </button>
                    <ChevronRight className={styles.sessionArrow} size={20} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Polls Section */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2>Recent Polls</h2>
            <button className={styles.btnOutline}>
              View All
            </button>
          </div>
          
          <div className={styles.pollsGrid}>
            <PollCard
              status="published"
              question="How satisfied are you with today's presentation?"
              results={[
                { label: "Very Satisfied", percentage: 75 },
                { label: "Satisfied", percentage: 20 },
                { label: "Neutral", percentage: 5 }
              ]}
              onClose={() => console.log('Close poll')}
              onHideResults={() => console.log('Hide results')}
            />
            
            <PollCard
              status="draft"
              question="Which topic would you like to explore further?"
              onPublish={() => console.log('Publish poll')}
              onEdit={() => console.log('Edit poll')}
            />
            
            <PollCard
              status="closed"
              question="What is your preferred time for the next session?"
              results={[
                { label: "Morning", percentage: 40 },
                { label: "Afternoon", percentage: 35 },
                { label: "Evening", percentage: 25 }
              ]}
              onReopen={() => console.log('Reopen poll')}
              onExport={() => console.log('Export results')}
            />
          </div>
        </div>
      </div>

      {/* Session Creation Modal */}
      {showModal && (
        <SessionModal 
          onClose={() => setShowModal(false)} 
          onSubmit={addNewSession}
        />
      )}
    </div>
  );
};

export default Dashboard;