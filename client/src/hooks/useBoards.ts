import { useState, useEffect } from 'react';
import * as boardsApi from '../api/boards';
import type { Column } from '../components/KanbanColumn/KanbanColumn';

export function useBoards() {
  const [columns, setColumns] = useState<Column[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    boardsApi.fetchColumns()
      .then(res => setColumns(res.data))
      .finally(() => setLoading(false));
  }, []);

  const addColumn = async (title: string) => {
    const res = await boardsApi.createColumn(title);
    setColumns(cols => [...cols, res.data]);
  };

  // เพิ่ม updateColumn, deleteColumn ถ้าต้องใช้

  return { columns, loading, addColumn /*, updateColumn, deleteColumn */ };
}
