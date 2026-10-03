import { apiFetch } from './api';

/**
 * Vehicle service backed by the Express + MongoDB API.
 * Admin mutations (create/update/delete) require a valid JWT, which
 * apiFetch attaches automatically.
 */
export const carService = {
  /**
   * Fetch all vehicles with optional filtering and sorting.
   */
  async getCars(filters, sort) {
    const queryParams = new URLSearchParams();
    if (filters?.searchQuery) queryParams.set('search', filters.searchQuery);
    if (filters?.make) queryParams.set('make', filters.make);
    if (filters?.bodyType) queryParams.set('bodyType', filters.bodyType);
    if (filters?.condition) queryParams.set('condition', filters.condition);
    if (filters?.fuelType) queryParams.set('fuelType', filters.fuelType);
    if (filters?.transmission) queryParams.set('transmission', filters.transmission);
    if (filters?.status) queryParams.set('status', filters.status);
    if (filters?.minPrice !== '' && filters?.minPrice !== undefined) queryParams.set('minPrice', String(filters.minPrice));
    if (filters?.maxPrice !== '' && filters?.maxPrice !== undefined) queryParams.set('maxPrice', String(filters.maxPrice));
    if (filters?.minYear !== '' && filters?.minYear !== undefined) queryParams.set('minYear', String(filters.minYear));
    if (filters?.maxYear !== '' && filters?.maxYear !== undefined) queryParams.set('maxYear', String(filters.maxYear));
    if (sort) queryParams.set('sort', sort);

    const qs = queryParams.toString();
    return apiFetch(`/api/cars${qs ? `?${qs}` : ''}`);
  },

  /**
   * Fetch a single vehicle by its id or stock number.
   */
  async getCarById(id) {
    return apiFetch(`/api/cars/${encodeURIComponent(id)}`);
  },

  /**
   * Fetch featured, unsold vehicles for the homepage.
   */
  async getFeaturedCars() {
    const cars = await this.getCars();
    return cars.filter((c) => c.featured && c.status !== 'sold');
  },

  /**
   * Create a new vehicle (Admin).
   */
  async createCar(data) {
    return apiFetch('/api/cars', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  /**
   * Update an existing vehicle (Admin).
   */
  async updateCar(id, updates) {
    return apiFetch(`/api/cars/${encodeURIComponent(id)}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  },

  /**
   * Delete a vehicle (Admin).
   */
  async deleteCar(id) {
    await apiFetch(`/api/cars/${encodeURIComponent(id)}`, { method: 'DELETE' });
    return true;
  },

  /**
   * Quick status change (available / reserved / sold).
   */
  async updateCarStatus(id, status) {
    return this.updateCar(id, { status });
  },

  /**
   * Toggle the featured flag.
   */
  async toggleFeatured(id) {
    const car = await this.getCarById(id);
    return this.updateCar(id, { featured: !car.featured });
  },
};
