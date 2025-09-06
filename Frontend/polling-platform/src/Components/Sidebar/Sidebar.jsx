import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Styles from './Header.module.css'

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()

  return (
    <div className={Styles.General}>
      <div className={Styles.myHeader}>
        {/* Hamburger Icon */}
        <img
          width="25"
          height="15"
          src="https://img.icons8.com/external-others-bomsymbols-/91/external-hamberger-flat-general-office-others-bomsymbols-.png"
          alt="hamburger-icon"
          onClick={() => setIsOpen(!isOpen)} // toggle sidebar
          style={{ cursor: 'pointer' }}
        />

        <span className={Styles.title}>PULL HUB</span>

        <img
          width="48"
          height="48"
          src="https://img.icons8.com/liquid-glass/48/user-male-circle.png"
          alt="user-icon"
        />
      </div>

      {/* Sidebar */}
      <div className={`${Styles.sidebar} ${isOpen ? Styles.show : ''}`}>
        <button onClick={() => { navigate('/questions'); setIsOpen(false) }}>Q&A</button>
        <button onClick={() => { navigate('/polls'); setIsOpen(false) }}>Polls</button>
        <button onClick={() => setIsOpen(false)}>Close</button>
      </div>
    </div>
  )
}

export default Header
