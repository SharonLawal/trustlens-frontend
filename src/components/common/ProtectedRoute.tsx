import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { authService } from '../../services/authService';

const ProtectedRoute: React.FC = () => {
  if (!authService.isAuthenticated()) {
    // User is not authenticated
    return <Navigate to="/login" replace />;
  }

  // User is authenticated, render the nested routes (e.g., Layout)
  return <Outlet />;
};

export default ProtectedRoute;