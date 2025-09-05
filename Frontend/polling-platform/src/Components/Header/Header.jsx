import React, { useState, useRef, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import Styles from './Header.module.css'

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation() // 👈 current route
  const firstLinkRef = useRef(null)
  const hamburgerRef = useRef(null)

  // Close on ESC
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') setIsOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  // manage focus & body scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    if (isOpen) {
      setTimeout(() => firstLinkRef.current?.focus(), 100)
    } else {
      hamburgerRef.current?.focus()
    }
  }, [isOpen])

  const handleNavigateClose = (path) => {
    navigate(path)
    setIsOpen(false)
  }

  return (
    <div className={Styles.General}>
      <div className={Styles.myHeader}>
        {/* Hamburger */}
        <button
          ref={hamburgerRef}
          className={Styles.hamburgerBtn}
          aria-controls="app-sidebar"
          aria-expanded={isOpen}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setIsOpen((s) => !s)}
        >
          <img
            width="25"
            height="15"
            src="https://img.icons8.com/external-others-bomsymbols-/91/external-hamberger-flat-general-office-others-bomsymbols-.png"
            alt=""
            aria-hidden="true"
          />
        </button>

        <span className={Styles.title}>PULL HUB</span>

        {/* Header buttons */}
        <div className={Styles.button}>
          <button
            className={`${Styles.btn} ${location.pathname === '/questions' ? Styles.active : ''}`}
            onClick={() => navigate('/questions')}
          >
            <img
              width="20"
              height="20"
              src="https://img.icons8.com/ios/50/speech-bubble-with-dots--v1.png"
              alt=""
              aria-hidden="true"
            />
            Q&A
          </button>

          <button
            className={`${Styles.btn1} ${location.pathname === '/polls' ? Styles.active : ''}`}
            onClick={() => navigate('/polls')}
          >
            <img
              width="20"
              height="20"
              src="https://img.icons8.com/ios/50/bar-chart.png"
              alt=""
              aria-hidden="true"
            />
            Polls
          </button>
        </div>

        <img
          width="48"
          height="48"
          src="https://img.icons8.com/liquid-glass/48/user-male-circle.png"
          alt="Profile"
        />
      </div>

      {/* Overlay */}
      <div
        className={`${Styles.overlay} ${isOpen ? Styles.showOverlay : ''}`}
        onClick={() => setIsOpen(false)}
        aria-hidden={!isOpen}
      />

      {/* Sidebar */}
      <aside
        id="app-sidebar"
        className={`${Styles.sidebar} ${isOpen ? Styles.show : ''}`}
        role="dialog"
        aria-modal="true"
      >
        <div className={Styles.sidebarInner}>
          <button
            ref={firstLinkRef}
            className={`${Styles.sideBtn} ${location.pathname === '/' ? Styles.active : ''}`}
            onClick={() => handleNavigateClose('/')}
          >
            Home
          </button>

          <button
            className={`${Styles.sideBtn} ${location.pathname === '/questions' ? Styles.active : ''}`}
            onClick={() => handleNavigateClose('/questions')}
          >
            Q&A
          </button>

          <button
            className={`${Styles.sideBtn} ${location.pathname === '/polls' ? Styles.active : ''}`}
            onClick={() => handleNavigateClose('/polls')}
          >
            Polls
          </button>

          <button
            className={Styles.sideBtn}
            onClick={() => setIsOpen(false)}
          >
            Close
          </button>
        </div>
      </aside>
    </div>
  )
}

export default Header
