import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Tickets from './pages/Tickets';
import Reports from './pages/Reports';
import AppShell from './components/AppShell';
import ProtectedRoute from './components/ProtectedRoute'; // <-- Import your new guard

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      
      {/* Protect the entire App area by wrapping AppShell */}
      <Route 
        path="/app" 
        element={
          <ProtectedRoute>
            <AppShell />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="tickets" element={<Tickets />} />
        <Route path="reports" element={<Reports />} />
      </Route>
    </Routes>
  );
}