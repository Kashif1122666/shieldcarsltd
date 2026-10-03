import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';
const AuthContext = createContext(undefined);
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => authService.getCurrentUser());
    useEffect(() => {
        setUser(authService.getCurrentUser());
    }, []);
    const login = async (email, password) => {
        const loggedInUser = await authService.login(email, password);
        setUser(loggedInUser);
        return loggedInUser;
    };
    const logout = () => {
        authService.logout();
        setUser(null);
    };
    return (<AuthContext.Provider value={{
            user,
            isAuthenticated: Boolean(user),
            login,
            logout,
        }}>
      {children}
    </AuthContext.Provider>);
};
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
