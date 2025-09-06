import React from 'react'
import Participant from '../../Components/Participant/Participant'
import Login from '../../Components/Login/Login'
import styles from './styles.module.css'

const LoginPage = () => {
  return (
    <div className={styles.login}>
      <Participant/>
      <Login/>
    </div>
  )
}

export default LoginPage
