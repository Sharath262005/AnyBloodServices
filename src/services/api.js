const API_BASE_URL = 'http://localhost/BloodCamp/backend';

class ApiService {
  constructor() {
    this.token = localStorage.getItem('auth_token') || null;
  }

  setToken(token) {
    this.token = token;
    if (token) {
      localStorage.setItem('auth_token', token);
    } else {
      localStorage.removeItem('auth_token');
    }
  }

  getToken() {
    return this.token || localStorage.getItem('auth_token');
  }

  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}/${endpoint}`;
    const token = this.getToken();
    
    const config = {
      ...options,
      credentials: 'include', // Important for cookies
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    };

    // Add Authorization header if token exists
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      // Don't throw error for auth check - just return the response
      if (endpoint.includes('auth.php?action=check') && response.status === 401) {
        return data;
      }

      if (!response.ok && response.status !== 401) {
        throw new Error(data.error || data.message || `HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error('API Error:', error.message, 'Endpoint:', endpoint);
      // For network errors, rethrow
      throw error;
    }
  }

  // Auth API
  async login(username, password) {
    const response = await this.request('auth.php', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });
    
    if (response.token) {
      this.setToken(response.token);
    }
    
    return response;
  }

  async logout() {
    const response = await this.request('auth.php?action=logout', {
      method: 'POST',
    });
    
    this.setToken(null);
    localStorage.removeItem('auth_token');
    return response;
  }

  async checkAuth() {
    try {
      const response = await this.request('auth.php?action=check');
      // If response has authenticated: true, keep token
      if (response.authenticated === true) {
        return response;
      } else {
        // Clear token if not authenticated
        this.setToken(null);
        return response;
      }
    } catch (error) {
      // Clear token on any error
      this.setToken(null);
      console.log('Auth check error:', error.message);
      return { authenticated: false };
    }
  }

  // Donors API
  async getDonors(filters = {}) {
    const params = new URLSearchParams(filters).toString();
    return this.request(`donors.php${params ? '?' + params : ''}`);
  }

  async getDonor(id) {
    return this.request(`donors.php?id=${id}`);
  }

  async createDonor(donorData) {
    return this.request('donors.php', {
      method: 'POST',
      body: JSON.stringify(donorData),
    });
  }

  async updateDonor(donorData) {
    return this.request('donors.php', {
      method: 'PUT',
      body: JSON.stringify(donorData),
    });
  }

  async deleteDonor(id) {
    return this.request(`donors.php?id=${id}`, {
      method: 'DELETE',
    });
  }

  // Camps API
  async getCamps(filters = {}) {
    const params = new URLSearchParams(filters).toString();
    return this.request(`camps.php${params ? '?' + params : ''}`);
  }

  async getCamp(id) {
    return this.request(`camps.php?id=${id}`);
  }

  async createCamp(campData) {
    return this.request('camps.php', {
      method: 'POST',
      body: JSON.stringify(campData),
    });
  }

  async updateCamp(campData) {
    return this.request('camps.php', {
      method: 'PUT',
      body: JSON.stringify(campData),
    });
  }

  async deleteCamp(id) {
    return this.request(`camps.php?id=${id}`, {
      method: 'DELETE',
    });
  }

  // Inventory API
  async searchBlood(filters = {}) {
    const params = new URLSearchParams({ search: true, ...filters }).toString();
    return this.request(`inventory.php?${params}`);
  }

  async getCampInventory(campId) {
    return this.request(`inventory.php?camp_id=${campId}`);
  }

  async updateInventory(inventoryData) {
    return this.request('inventory.php', {
      method: 'PUT',
      body: JSON.stringify(inventoryData),
    });
  }

  async bulkUpdateInventory(campId, inventory) {
    return this.request('inventory.php', {
      method: 'POST',
      body: JSON.stringify({ camp_id: campId, inventory }),
    });
  }

  // Feedback API
  async getFeedback(filters = {}) {
    const params = new URLSearchParams(filters).toString();
    return this.request(`feedback.php${params ? '?' + params : ''}`);
  }

  async submitFeedback(feedbackData) {
    return this.request('feedback.php', {
      method: 'POST',
      body: JSON.stringify(feedbackData),
    });
  }

  async updateFeedbackStatus(id, status) {
    return this.request('feedback.php', {
      method: 'PUT',
      body: JSON.stringify({ id, status }),
    });
  }

  async deleteFeedback(id) {
    return this.request(`feedback.php?id=${id}`, {
      method: 'DELETE',
    });
  }
}

export default new ApiService();