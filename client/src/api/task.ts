// src/api/task.ts
import { api } from './client';
import type { TaskOut, TaskCreate, TaskUpdate } from '../types/task';

export async function fetchTasks(columnId: number): Promise<TaskOut[]> {
  const response = await api.get<TaskOut[]>(`/columns/${columnId}/tasks`);
  return response.data;
}

export async function createTask(columnId: number, data: TaskCreate): Promise<TaskOut> {
  const response = await api.post<TaskOut>(`/columns/${columnId}/tasks`, data);
  return response.data;
}

export async function updateTask(columnId: number, taskId: number, data: TaskUpdate): Promise<TaskOut> {
  const response = await api.put<TaskOut>(`/columns/${columnId}/tasks/${taskId}`, data);
  return response.data;
}

export async function deleteTask(columnId: string, taskId: string) {
  const response = await api.delete(`/columns/${columnId}/tasks/${taskId}`);
  return response.data;
}

export async function reorderTask(columnId: number, taskId: number, position: number): Promise<TaskOut> {
  const response = await api.patch<TaskOut>(`/columns/${columnId}/tasks/${taskId}/position`, { position });
  return response.data;
}
