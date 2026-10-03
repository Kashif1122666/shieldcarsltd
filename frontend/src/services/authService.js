import { apiFetch } from './api';

/**
 * Auth service for the Shield Cars Ltd admin dashboard.
 *
 * Login exchanges credentials for a JWT via POST /api/auth/login.
 * The token is stored in localStorage and automatically attached to
 * subsequent requests by apiFetch. The cached user keeps the admin
 * session alive across reloads until logout.
 */
const AUTH_STORAGE_KEY = 'scl_admin_session';
const TOKEN_STORAGE_KEY = 'scl_admin_token';

export const authService = {
  async login(email, password) {
    const data = await apiFetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email: email.trim(), password }),
    });

    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(data.user));
    localStorage.setItem(TOKEN_STORAGE_KEY, data.token);
    return data.user;
  },

  logout() {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    localStorage.removeItem(TOKEN_STORAGE_KEY);
  },

  getToken() {
    return localStorage.getItem(TOKEN_STORAGE_KEY);
  },

  getCurrentUser() {
    try {
      const data = localStorage.getItem(AUTH_STORAGE_KEY);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  },

  isAuthenticated() {
    return Boolean(localStorage.getItem(TOKEN_STORAGE_KEY));
  },
};
