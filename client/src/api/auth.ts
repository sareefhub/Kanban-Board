import axios from 'axios';
import API_BASE_URL from '../config/apiConfig';

export interface RegisterData {
  username: string;
  email: string;
  password: string;
}

export interface LoginData {
  username: string;
  password: string;
}

export async function registerUser(data: RegisterData) {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/register`, data, {
      headers: { 'Content-Type': 'application/json' },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Register failed');
  }
}

export async function loginUser(data: LoginData) {
  try {
    const params = new URLSearchParams();
    params.append('username', data.username);
    params.append('password', data.password);

    const response = await axios.post(`${API_BASE_URL}/auth/login`, params, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });

    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.detail || 'Login failed');
  }
}
