// src/components/ProtectedRoute.test.jsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import { AuthContext } from '../context/AuthContext';// Adjust path if needed

describe('ProtectedRoute Component', () => {
  
  it('redirects an unauthenticated user to /login', () => {
    // 1. Setup fake auth state with NO token
    const unauthenticatedState = { token: null };

    // 2. Render the app wrapped in a MemoryRouter starting at the protected route
    render(
      <AuthContext.Provider value={unauthenticatedState}>
        <MemoryRouter initialEntries={['/app/tickets']}>
          <Routes>
            <Route path="/login" element={<h1>Login Page</h1>} />
            <Route 
              path="/app/tickets" 
              element={
                <ProtectedRoute>
                  <h1>Protected Tickets</h1>
                </ProtectedRoute>
              } 
            />
          </Routes>
        </MemoryRouter>
      </AuthContext.Provider>
    );

    // 3. Verify the redirect worked (we should see the Login Page)
    expect(screen.getByText('Login Page')).toBeInTheDocument();
    expect(screen.queryByText('Protected Tickets')).not.toBeInTheDocument();
  });

  it('allows an authenticated user to view the protected ticket page', () => {
    // 1. Setup fake auth state WITH a token
    const authenticatedState = { token: 'valid-fake-jwt-token' };

    // 2. Render the app starting at the protected route
    render(
      <AuthContext.Provider value={authenticatedState}>
        <MemoryRouter initialEntries={['/app/tickets']}>
          <Routes>
            <Route path="/login" element={<h1>Login Page</h1>} />
            <Route 
              path="/app/tickets" 
              element={
                <ProtectedRoute>
                  <h1>Protected Tickets</h1>
                </ProtectedRoute>
              } 
            />
          </Routes>
        </MemoryRouter>
      </AuthContext.Provider>
    );

    // 3. Verify the user stayed on the protected page
    expect(screen.getByText('Protected Tickets')).toBeInTheDocument();
    expect(screen.queryByText('Login Page')).not.toBeInTheDocument();
  });
});