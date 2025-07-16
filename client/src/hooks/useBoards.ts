// src/hooks/useBoards.ts
import { useState, useEffect } from 'react';
import { listBoards } from '../api/boards';
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

  useEffect(() => {
    if (!authUser) {
      setBoards([]);
      return;
    }
    const fetchBoards = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await listBoards();
        const boardsData = response.data.map(b => ({
          id: b.id.toString(),
          title: b.title,
          columns: [],
        }));
        setBoards(boardsData);
      } catch (err: any) {
        setError(err.message || 'Failed to load boards');
      } finally {
        setLoading(false);
      }
    };
    fetchBoards();
  }, [authUser]);

  return { boards, setBoards, loading, error };
}
