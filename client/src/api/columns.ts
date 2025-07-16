// src/api/columns.ts
import { api } from './client';

export function fetchColumns(boardId: number) {
  return api.get(`/boards/${boardId}/columns`);
}

export function createColumn(boardId: number, title: string) {
  return api.post(`/boards/${boardId}/columns`, { title });
}

export function updateColumn(boardId: number, columnId: number, title: string) {
  return api.put(`/boards/${boardId}/columns/${columnId}`, { title });
}

export function deleteColumn(boardId: number, columnId: number) {
  return api.delete(`/boards/${boardId}/columns/${columnId}`);
}