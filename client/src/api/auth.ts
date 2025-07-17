// src/api/auth.ts
import { api } from './client';
import type { RegisterData, LoginData } from '../types/auth';

export async function registerUser(data: RegisterData) {
  try {
    const response = await api.post('/auth/register', data);
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

    const response = await api.post('/auth/login', params, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });

    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.detail || 'Login failed');
  }
}