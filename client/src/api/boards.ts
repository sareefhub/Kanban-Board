import { api } from './client';
import type { Column } from '../components/KanbanColumn/KanbanColumn';

// Fetch all columns for current board
export function fetchColumns() {
  return api.get<Column[]>('/boards/current/columns');
}

// Create a new column
export function createColumn(title: string) {
  return api.post<Column>('/boards/current/columns', { title });
}

// (ต่อเติม updateColumn, deleteColumn ตามต้องการ)
