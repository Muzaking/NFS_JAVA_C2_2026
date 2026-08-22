<<<<<<< HEAD
import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import AppShell from './components/AppShell.jsx';
import LoadingMessage from './components/LoadingMessage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import AssetsPage from './pages/AssetsPage.jsx';
import { AssetDataProvider } from './context/AssetDataContext.jsx';

const AssetFormPage = lazy(() => import('./pages/AssetFormPage.jsx'));
const ReportsPage = lazy(() => import('./pages/ReportsPage.jsx'));
const DocsPage = lazy(() => import('./pages/DocsPage.jsx'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage.jsx'));

function withFallback(element) {
  return <Suspense fallback={<LoadingMessage message="Loading page..." />}>{element}</Suspense>;
}
=======
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import TicketsPage from './pages/TicketsPage';
>>>>>>> main

export default function App() {
  return (
    <Routes>
<<<<<<< HEAD
      <Route path="/" element={<Navigate to="/app/dashboard" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/docs" element={withFallback(<DocsPage />)} />

      <Route
        path="/app"
        element={
          <ProtectedRoute>
            <AssetDataProvider>
              <AppShell />
            </AssetDataProvider>
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="assets" element={<AssetsPage />} />
        <Route path="assets/new" element={withFallback(<AssetFormPage />)} />
        <Route path="assets/:assetId/edit" element={withFallback(<AssetFormPage />)} />
        <Route path="reports" element={withFallback(<ReportsPage />)} />
      </Route>

      <Route path="*" element={withFallback(<NotFoundPage />)} />
=======
      {/* If someone visits the root URL, redirect them to login */}
      <Route path="/" element={<Navigate to="/login" />} />
      
      {/* The routes requested for the exercise */}
      <Route path="/login" element={<Login />} />
      <Route path="/app/dashboard" element={<Dashboard />} />
      <Route path="/app/tickets" element={<TicketsPage />} />
>>>>>>> main
    </Routes>
  );
}