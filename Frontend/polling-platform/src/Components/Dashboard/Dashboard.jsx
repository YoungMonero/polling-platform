// HostDashboard.jsx
import React from "react";
import styles from "./styles.module.css";

const Dashboard = ({
  active = true,
  onCreatePoll = () => {},
  onViewParticipants = () => {},
  onClosePoll = () => {},
  onHideResults = () => {},
  onPublish = () => {},
  onEdit = () => {},
  onReopen = () => {},
  onExport = () => {},
}) => {
  return (
    <div
      id="host-dashboard"
      className={`${styles.view} ${active ? styles.active : ""}`}
    >
      <h1 className={styles.hostDash}>Host Dashboard</h1>

      {/* Current session card */}
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <h2 className={styles.cardTitle}>Current Session: Webinar Q&amp;A</h2>
          <div>
            <span className={styles.pollStapub}>Active</span>
            <span className={styles.sessionCode}>
              Session Code: <strong>ABC123</strong>
            </span>
          </div>
        </div>

        <div className={styles.cardBody}>
          <p>
            Share this code with participants to join your session:{" "}
            <strong>ABC123</strong>
          </p>

          <div className={styles.viewPart}>
            <button className={styles.press} onClick={() => onCreatePoll("create-poll")}>
              Create New Poll
            </button>
            <button className={styles.nonpress} onClick={onViewParticipants}>
              View Participants
            </button>
          </div>
        </div>
      </div>

      {/* Your Polls */}
      <h2 className={styles.hostDash}>Your Polls</h2>

      <div className={`${styles.pollList} ${styles["poll-list"] || ""}`}>
        {/* Poll 1 — Published */}
        <div className={styles.pollCard}>
          <span className={styles.pollStapub}>Published</span>
          <h3 className={styles.pollQuestion}>
            How satisfied are you with today&apos;s presentation?
          </h3>

          <div className={styles.resultsChart}>
            <div className={styles.chartBar}>
              <div className={styles.chartFill} style={{ width: "75%" }}>
                Very Satisfied (75%)
              </div>
            </div>
            <div className={styles.chartBar}>
              <div className={styles.chartFill} style={{ width: "20%" }}>
                Satisfied (20%)
              </div>
            </div>
            <div className={styles.chartBar}>
              <div className={styles.chartFill} style={{ width: "5%" }}>
                Neutral (5%)
              </div>
            </div>
          </div>

          <div className={styles.popBtn}>
            <button className={styles.nonwarn} onClick={onClosePoll}>
              Close Poll
            </button>
            <button className={styles.nonout} onClick={onHideResults}>
              Hide Results
            </button>
          </div>
        </div>

        {/* Poll 2 — Draft */}
        <div className={styles.pollCard}>
          <span className={styles.polDraft}>Draft</span>
          <h3 className={styles.pollQuestion}>
            Which topic would you like to explore further?
          </h3>
          <p>This poll has not been published yet.</p>

          <div className={styles.disBtn}>
            <button className={styles.nonsuc} onClick={onPublish}>
              Publish
            </button>
            <button className={styles.nonout} onClick={onEdit}>
              Edit
            </button>
          </div>
        </div>

        {/* Poll 3 — Closed */}
        <div className={styles.pollCard}>
          <span className={styles.pollStaclose}>Closed</span>
          <h3 className={styles.pollQuestion}>
            What is your preferred time for the next session?
          </h3>

          <div className={styles.resultsChart}>
            <div className={styles.chartBar}>
              <div className={styles.chartFill} style={{ width: "40%" }}>
                Morning (40%)
              </div>
            </div>
            <div className={styles.chartBar}>
              <div className={styles.chartFill} style={{ width: "35%" }}>
                Afternoon (35%)
              </div>
            </div>
            <div className={styles.chartBar}>
              <div className={styles.chartFill} style={{ width: "25%" }}>
                Evening (25%)
              </div>
            </div>
          </div>

          <div className={styles.popBtn}>
            <button className={styles.press} onClick={onReopen}>
              Reopen
            </button>
            <button className={styles.nonpress} onClick={onExport}>
              Export Results
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
