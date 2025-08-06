const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

class ApiService {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    const response = await fetch(url, config);
    
    if (!response.ok) {
      const error = await response.json().catch(() => ({ detail: 'An error occurred' }));
      throw new Error(error.detail || 'An error occurred');
    }

    return response.json();
  }

  private getAuthHeaders(token: string) {
    return {
      Authorization: `Bearer ${token}`,
    };
  }

  // Auth endpoints
  async login(email: string, password: string) {
    return this.request<{ access_token: string; token_type: string }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async register(email: string, password: string, full_name?: string) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, full_name }),
    });
  }

  async getCurrentUser(token: string) {
    return this.request('/users/me', {
      headers: this.getAuthHeaders(token),
    });
  }

  async updateProfile(token: string, data: { email?: string; full_name?: string }) {
    return this.request('/users/me', {
      method: 'PUT',
      headers: this.getAuthHeaders(token),
      body: JSON.stringify(data),
    });
  }

  // Items endpoints
  async getItems(token: string) {
    return this.request('/items/', {
      headers: this.getAuthHeaders(token),
    });
  }

  async createItem(token: string, data: { title: string; description?: string }) {
    return this.request('/items/', {
      method: 'POST',
      headers: this.getAuthHeaders(token),
      body: JSON.stringify(data),
    });
  }

  async updateItem(token: string, id: number, data: { title?: string; description?: string }) {
    return this.request(`/items/${id}`, {
      method: 'PUT',
      headers: this.getAuthHeaders(token),
      body: JSON.stringify(data),
    });
  }

  async deleteItem(token: string, id: number) {
    return this.request(`/items/${id}`, {
      method: 'DELETE',
      headers: this.getAuthHeaders(token),
    });
  }
}

export const authApi = new ApiService();
export const itemsApi = new ApiService();