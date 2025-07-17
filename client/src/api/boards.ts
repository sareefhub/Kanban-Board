import { api } from './client';
import type { Column } from '../components/KanbanColumn/KanbanColumn';

export interface BoardCreate {
  title: string;
}

export interface BoardUpdate {
  title: string;
}

export interface BoardOut {
  id: number;
  title: string;
  owner_id?: number;
}

export async function listBoards() {
  try {
    const response = await api.get<BoardOut[]>('/boards');
    return response;
  } catch (error: any) {
    throw new Error(error.response?.data?.detail || 'Failed to fetch boards');
  }
}

export async function createBoard(data: BoardCreate) {
  try {
    const response = await api.post<BoardOut>('/boards', data);
    return response;
  } catch (error: any) {
    throw new Error(error.response?.data?.detail || 'Failed to create board');
  }
}

export async function updateBoard(boardId: number, data: BoardUpdate) {
  try {
    const response = await api.put<BoardOut>(`/boards/${boardId}`, data);
    return response;
  } catch (error: any) {
    throw new Error(error.response?.data?.detail || 'Failed to update board');
  }
}

export async function deleteBoard(boardId: number) {
  try {
    const response = await api.delete(`/boards/${boardId}`);
    return response;
  } catch (error: any) {
    throw new Error(error.response?.data?.detail || 'Failed to delete board');
  }
}

export async function fetchColumns(boardId: number) {
  try {
    const response = await api.get<Column[]>(`/boards/${boardId}/columns`);
    return response;
  } catch (error: any) {
    throw new Error(error.response?.data?.detail || 'Failed to fetch columns');
  }
}

export async function createColumn(boardId: number, title: string) {
  try {
    await api.post<Column>(`/boards/${boardId}/columns`, { title });
    const updatedColumns = await fetchColumns(boardId);
    return updatedColumns;
  } catch (error: any) {
    throw new Error(error.response?.data?.detail || 'Failed to create column');
  }
}

export async function updateColumn(boardId: number, columnId: number, title: string) {
  try {
    await api.put<Column>(`/boards/${boardId}/columns/${columnId}`, { title });
    const updatedColumns = await fetchColumns(boardId);
    return updatedColumns;
  } catch (error: any) {
    throw new Error(error.response?.data?.detail || 'Failed to update column');
  }
}

export async function deleteColumn(boardId: number, columnId: number) {
  try {
    await api.delete(`/boards/${boardId}/columns/${columnId}`);
    const updatedColumns = await fetchColumns(boardId);
    return updatedColumns;
  } catch (error: any) {
    throw new Error(error.response?.data?.detail || 'Failed to delete column');
  }
}
