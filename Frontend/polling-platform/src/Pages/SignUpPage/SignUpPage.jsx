import React from 'react'
import Participant from '../../Components/Participant/Participant'
import Register from '../../Components/Signup/Signup'
import styles from './styles.module.css'

const SignUpPage = () => {
  return (
    <div className={styles.register}>
      <Participant/>
      <Register/>
    </div>
  )
}

export default SignUpPage
