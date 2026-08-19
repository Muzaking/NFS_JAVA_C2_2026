import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Tickets from './pages/Tickets'

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/app/dashboard" element={<Dashboard />} />
      <Route path="/app/tickets" element={<Tickets />} />
    </Routes>
  )
}

export default App