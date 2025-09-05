import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from '../src/components/Header'
import Participants from './pages/participants/participants'
import QuestionsPage from './pages/Question/QuestionPage'
import PollsPage from './pages/polls/polls'

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Participants />} />
        <Route path="/questions" element={<QuestionsPage />} />
        <Route path="/polls" element={<PollsPage />} />
      </Routes>
    </Router>
  )
}

export default App
