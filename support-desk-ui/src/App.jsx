import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import TicketFormPage from './pages/TicketFormPage';

export default function App() {
  return (
    <Routes>
      {/* 1. Add a dummy login page so the app has somewhere to send you if your token is missing! */}
      <Route path="/login" element={<div className="p-10 text-xl font-bold text-center mt-10">Login Page (Coming Soon)</div>} />

      {/* 2. Use the wrapper pattern so the 'children' prop receives the form page perfectly */}
      <Route 
        path="/app/tickets/new" 
        element={
          <ProtectedRoute>
            <TicketFormPage />
          </ProtectedRoute>
        } 
      />

      {/* Fallback redirects */}
      <Route path="/app" element={<Navigate to="/app/tickets/new" replace />} />
      <Route path="*" element={<Navigate to="/app/tickets/new" replace />} />
    </Routes>
  );
}