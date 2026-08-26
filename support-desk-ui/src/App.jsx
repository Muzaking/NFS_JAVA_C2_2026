import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import TicketFormPage from './pages/TicketFormPage';
import TicketsPage from './pages/Tickets'; 
import Login from './pages/Login'; // <-- ADDED: Import the actual Login component

export default function App() {
  return (
    <Routes>
      {/* 1. Real login page */}
      <Route path="/login" element={<Login />} />

      {/* 2. Main Tickets List Route */}
      <Route 
        path="/app/tickets" 
        element={
          <ProtectedRoute>
            <TicketsPage />
          </ProtectedRoute>
        } 
      />

      {/* 3. Create New Ticket Route */}
      <Route 
        path="/app/tickets/new" 
        element={
          <ProtectedRoute>
            <TicketFormPage />
          </ProtectedRoute>
        } 
      />

      {/* 4. Edit Existing Ticket Route */}
      <Route 
        path="/app/tickets/:ticketId/edit" 
        element={
          <ProtectedRoute>
            <TicketFormPage />
          </ProtectedRoute>
        } 
      />

      {/* Fallback redirects - Changed to redirect to the main list instead of the form */}
      <Route path="/app" element={<Navigate to="/app/tickets" replace />} />
      <Route path="*" element={<Navigate to="/app/tickets" replace />} />
    </Routes>
  );
}