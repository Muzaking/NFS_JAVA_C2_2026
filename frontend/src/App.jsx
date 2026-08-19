import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import TicketsPage from './pages/TicketsPage';

export default function App() {
  return (
    <Routes>
      {/* If someone visits the root URL, redirect them to login */}
      <Route path="/" element={<Navigate to="/login" />} />
      
      {/* The routes requested for the exercise */}
      <Route path="/login" element={<Login />} />
      <Route path="/app/dashboard" element={<Dashboard />} />
      <Route path="/app/tickets" element={<TicketsPage />} />
    </Routes>
  );
}