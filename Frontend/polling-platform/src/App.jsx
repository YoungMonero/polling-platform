import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './Components/Header/Header'
import Question from './Components/Question/Questions'
import PollsPage from './Pages/PollsPages/PollsPage'


const App = () => (
  <Router>
    <Header />
    <Routes>
      <Route path="/PollsPage" element={<PollsPage />} />
      <Route path="/questions" element={<Question />} />
    </Routes>
  </Router>
)


export default App
