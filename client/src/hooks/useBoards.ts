import { useState, useEffect } from 'react';
import { listBoards, fetchColumns, updateBoard } from '../api/boards';
import type { Column } from '../components/KanbanColumn/KanbanColumn';

export interface Board {
  id: string;
  title: string;
  columns: Column[];
}

export function useBoards(authUser: { username?: string | null } | null) {
  const [boards, setBoards] = useState<Board[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAllBoards = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await listBoards();
      const boardsData = response.data;

      const boardsWithColumns = await Promise.all(
        boardsData.map(async (board) => {
          const colsRes = await fetchColumns(board.id);
          const colsData = colsRes.data;

          const colsWithTasks: Column[] = colsData.map(col => ({
            ...col,
            id: col.id.toString(),
            tasks: col.tasks || [],
          }));

          return {
            id: board.id.toString(),
            title: board.title,
            columns: colsWithTasks,
          };
        })
      );

      setBoards(boardsWithColumns);
    } catch (err: any) {
      setError(err.message || 'Failed to load boards');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!authUser) {
      setBoards([]);
      return;
    }
    fetchAllBoards();
  }, [authUser]);

  const renameBoard = async (boardId: number, newTitle: string) => {
    try {
      await updateBoard(boardId, { title: newTitle });
      await fetchAllBoards();
    } catch (error) {
      throw error;
    }
  };

  return { boards, setBoards, loading, error, renameBoard, fetchAllBoards };
}
