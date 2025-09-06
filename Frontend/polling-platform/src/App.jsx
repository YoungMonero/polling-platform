import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './Components/Header/Header'
import Question from './Components/Question/Questions'
import PollsPage from './Pages/PollsPages/PollsPage'
import Dashboard from './Components/Dashboard/Dashboard'
import SignUpPage from './Pages/SignUpPage/SignUpPage'
import LandingPage from './Pages/LandingPage/LandingPage'

// Layout wrapper for all "logged-in" pages
const Layout = ({ children }) => (
  <>
    {/* <Header /> */}
    {children}
  </>
)

const App = () => (
  <Router>
    <Routes>
      {/* Public route */}
      <Route path="/" element={<SignUpPage />} />

      {/* Protected routes with Header */}
      <Route path="/landingpage" element={<Layout><LandingPage /></Layout>} />
      <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
      <Route path="/pollsPage" element={<Layout><PollsPage /></Layout>} />
      <Route path="/questions" element={<Layout><Question /></Layout>} />
    </Routes>
  </Router>
)


export default App
