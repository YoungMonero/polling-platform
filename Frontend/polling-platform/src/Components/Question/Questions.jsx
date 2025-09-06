import React from 'react'
import Styles from './Questions.module.css'

const QuestionPage = () => {
  return (
    <div className={Styles.container}>
     <img width="50" height="50" src="https://img.icons8.com/ios/50/new-message.png" alt="new-message"/>
        className={Styles.image}
      <h1>Questions Closed</h1>
      <p>You currently can't send new questions.</p>
    </div>
  )
}

export default QuestionPage
