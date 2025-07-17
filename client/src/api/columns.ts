import { api } from './client';

export interface Task {
  id: number;
  title: string;
  description?: string;
  tags?: string[];
  priority?: 'low' | 'medium' | 'high';
  assignee?: string;
  date?: string;
}

export interface ColumnCreate {
  title: string;
  position: number;
  board_id: number;
}

export interface ColumnUpdate {
  title: string;
}

export interface ColumnOut {
  id: number;
  title: string;
  board_id: number;
  tasks: Task[];
}

export async function createColumn(boardId: number, data: ColumnCreate) {
  const response = await api.post<ColumnOut>(`/boards/${boardId}/columns`, data);
  return response.data;
}

export async function updateColumn(boardId: number, columnId: number, data: ColumnUpdate) {
  const response = await api.put<ColumnOut>(`/boards/${boardId}/columns/${columnId}`, data);
  return response.data;
}

export async function deleteColumn(boardId: number, columnId: number) {
  const response = await api.delete(`/boards/${boardId}/columns/${columnId}`);
  return response.data;
}

export async function fetchColumns(boardId: number) {
  const response = await api.get<ColumnOut[]>(`/boards/${boardId}/columns`);
  return response;
}
