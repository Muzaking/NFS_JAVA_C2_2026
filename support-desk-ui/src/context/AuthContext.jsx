import { createContext, useState, useContext } from 'react';

// 1. Create the context
export const AuthContext = createContext(null);

// 2. Create the Provider component
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);

  const login = async (email, password) => {
    try {
      // FIXED: Added the full Spring Boot backend URL (assuming default port 8080)
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Login failed. Check your credentials.');
      }

      const data = await response.json();
      
      // Save token to state and browser storage
      setToken(data.token);
      localStorage.setItem('token', data.token);
      setUser({ email }); 
      
      return true; // Indicate success
    } catch (error) {
      console.error("Login error:", error);
      return false; // Indicate failure
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// 3. Create a custom hook to use the context easily
export const useAuth = () => useContext(AuthContext);