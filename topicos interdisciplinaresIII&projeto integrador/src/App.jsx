
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import RegisterPage from '@/pages/RegisterPage';
import LoginPage from '@/pages/LoginPage'; // Placeholder for Login
import DashboardPage from '@/pages/DashboardPage'; // Placeholder
import RoutineLogPage from '@/pages/RoutineLogPage'; // Placeholder
import TimeClockPage from '@/pages/TimeClockPage'; // Placeholder
import ObservationsPage from '@/pages/ObservationsPage'; // Placeholder
import ReportsPage from '@/pages/ReportsPage'; // Placeholder
import { Toaster } from '@/components/ui/toaster';

// Mock auth status
const isAuthenticated = () => localStorage.getItem('authToken') !== null;

const ProtectedRoute = ({ children }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return children;
};


function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/cadastro" element={<RegisterPage />} />
          
          <Route path="/" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
          <Route path="/rotinas" element={<ProtectedRoute><RoutineLogPage /></ProtectedRoute>} />
          <Route path="/ponto" element={<ProtectedRoute><TimeClockPage /></ProtectedRoute>} />
          <Route path="/observacoes" element={<ProtectedRoute><ObservationsPage /></ProtectedRoute>} />
          <Route path="/relatorios" element={<ProtectedRoute><ReportsPage /></ProtectedRoute>} />
          
          <Route path="*" element={<Navigate to={isAuthenticated() ? "/" : "/login"} replace />} />
        </Routes>
      </Layout>
      <Toaster />
    </Router>
  );
}

export default App;
  