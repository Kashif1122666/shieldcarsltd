import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { authService } from '../../services/authService';
export const ProtectedRoute = ({ children }) => {
    const { user } = useAuth();
    const location = useLocation();
    // Require both a session user AND a stored token; either missing means logged out
    const authenticated = Boolean(user) && authService.isAuthenticated();
    if (!authenticated) {
        return <Navigate to="/admin/login" replace state={{ from: location.pathname }} />;
    }
    return children;
};
