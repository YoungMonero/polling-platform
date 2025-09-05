import React from 'react'
import { useNavigate } from 'react-router-dom'
import Styles from './Header.module.css'

const Header = () => {
  const navigate = useNavigate() // hook to navigate programmatically

  return (
    <div className={Styles.General}>
      <div className={Styles.myHeader}>
        <img
          width="25"
          height="15"
          src="https://img.icons8.com/external-others-bomsymbols-/91/external-hamberger-flat-general-office-others-bomsymbols-.png"
          alt="hamburger-icon"
        />
        <span className={Styles.title}>PULL HUB</span>

        <div className={Styles.button}>
          <button className={Styles.btn} onClick={() => navigate('/questions')}>
            Q&A
          </button>
          <button className={Styles.btn1} onClick={() => navigate('/polls')}>
            Polls
          </button>
        </div>

        <img
          width="48"
          height="48"
          src="https://img.icons8.com/liquid-glass/48/user-male-circle.png"
          alt="user-icon"
        />
      </div>
    </div>
  )
}

export default Header
