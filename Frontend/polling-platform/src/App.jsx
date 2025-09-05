import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './Components/Header/Header'
import Polls from './Components/Polls/Polls'
import Question from './Components/Question/Questions'


const App = () => (
  <Router>
    <Header />
    <Routes>
      <Route path="/" element={<div>Welcome Home</div>} />
      <Route path="/polls" element={<Polls />} />
      <Route path="/questions" element={<Question />} />
    </Routes>
  </Router>
)

export default App
