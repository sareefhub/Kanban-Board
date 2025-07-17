// src/types/board.ts

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

export type BoardWithColumns = {
  id: number;
  title: string;
  columns: Column[];
};
