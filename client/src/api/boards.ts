import { api } from './client';
import type { Column } from '../components/KanbanColumn/KanbanColumn';

export interface Board {
  id: number;
  title: string;
}

export function listBoards() {
  return api.get<Board[]>('/boards');
}

export function createBoard(data: { title: string }) {
  return api.post<Board>('/boards', data);
}

export function fetchColumns(boardId: number) {
  return api.get<Column[]>(`/boards/${boardId}/columns`);
}

export function createColumn(boardId: number, title: string) {
  return api.post<Column>(`/boards/${boardId}/columns`, { title });
}

export function updateColumn(boardId: number, columnId: number, title: string) {
  return api.put<Column>(`/boards/${boardId}/columns/${columnId}`, { title });
}

export function deleteColumn(boardId: number, columnId: number) {
  return api.delete(`/boards/${boardId}/columns/${columnId}`);
}

export function inviteMember(boardId: number, data: { email: string }) {
  return api.post(`/boards/${boardId}/invite`, data);
}