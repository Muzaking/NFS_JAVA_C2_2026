import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children }) {
  const { token } = useAuth(); 
  
  // Let's see exactly what the guard thinks your token is!
  console.log("Security Guard Check! Token is:", token);

  if (!token) {
    console.log("No token found! Bouncing to login...");
    return <Navigate to="/login" replace />;
  }

  return children;
}