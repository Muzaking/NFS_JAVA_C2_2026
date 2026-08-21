import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import TicketFormPage from './pages/TicketFormPage';
import TicketsPage from './pages/Tickets'; // <-- NEW: Import the Tickets page

export default function App() {
  return (
    <Routes>
      {/* 1. Dummy login page */}
      <Route path="/login" element={<div className="p-10 text-xl font-bold text-center mt-10">Login Page (Coming Soon)</div>} />

      {/* 2. NEW: Main Tickets List Route */}
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