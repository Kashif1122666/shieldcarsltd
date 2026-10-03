/**
 * API client layer for Shield Cars Ltd.
 *
 * Talks to the Express + MongoDB backend in /backend.
 * In development, Vite proxies /api to http://localhost:5000 (see vite.config.js),
 * so requests are same-origin and no CORS setup is needed.
 * Set VITE_API_URL to target a different backend origin.
 */
export const API_BASE_URL = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');

export class ApiError extends Error {
  constructor(status, message) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

/**
 * Standardized fetch helper. Automatically attaches the admin JWT
 * (if present) as a Bearer token and parses JSON responses.
 */
export async function apiFetch(endpoint, options = {}) {
  const token = localStorage.getItem('scl_admin_token');
  const headers = new Headers(options.headers || {});

  if (!headers.has('Content-Type') && !(options.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json');
  }

  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const path = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    let errorMessage = `Request failed with status ${response.status}`;
    try {
      const errorJson = await response.json();
      errorMessage = errorJson.message || errorMessage;
    } catch {
      // ignore non-JSON error bodies
    }
    throw new ApiError(response.status, errorMessage);
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}
