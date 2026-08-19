import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children }) {
  const { token } = useAuth();
  
  // 1. Grab the current location the user is trying to access
  const location = useLocation();

  if (!token) {
    // 2. Pass that location inside the 'state' prop when redirecting
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}