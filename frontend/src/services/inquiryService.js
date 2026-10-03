import { apiFetch } from './api';

/**
 * Customer inquiry service backed by the Express + MongoDB API.
 * Submissions are public; listing/updating/deleting require an admin JWT.
 */
export const inquiryService = {
  /**
   * Submit a new customer inquiry (public).
   */
  async submitInquiry(data) {
    return apiFetch('/api/inquiries', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  /**
   * List all inquiries, newest first (Admin).
   */
  async getInquiries() {
    return apiFetch('/api/inquiries');
  },

  /**
   * Update an inquiry's status (Admin).
   */
  async updateInquiryStatus(id, status) {
    return apiFetch(`/api/inquiries/${encodeURIComponent(id)}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
  },

  /**
   * Delete an inquiry (Admin).
   */
  async deleteInquiry(id) {
    await apiFetch(`/api/inquiries/${encodeURIComponent(id)}`, { method: 'DELETE' });
    return true;
  },
};
