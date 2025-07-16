// src/hooks/useBoards.ts
import { useState, useEffect } from 'react';
import * as boardsApi from '../api/boards';
import type { Column } from '../components/KanbanColumn/KanbanColumn';

export function useBoards(boardId: number) {
  const [columns, setColumns] = useState<Column[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    boardsApi.fetchColumns(boardId)
      .then(res => setColumns(res.data))
      .finally(() => setLoading(false));
  }, [boardId]);

  const addColumn = async (title: string) => {
    const res = await boardsApi.createColumn(boardId, title);
    setColumns(cols => [...cols, res.data]);
  };

  return { columns, loading, addColumn };
}
