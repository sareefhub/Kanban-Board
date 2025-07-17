import { useState } from 'react';
import type { Column, Task } from '../components/KanbanColumn/KanbanColumn';
import { updateBoard, deleteBoard } from '../api/boards';
import { createColumn, ColumnOut } from '../api/columns';
import { listBoards, fetchColumns } from '../api/boards';

interface Board {
  id: string;
  title: string;
  columns: Column[];
}

interface UseKanbanBoardParams {
  boards: Board[];
  setBoards: React.Dispatch<React.SetStateAction<Board[]>>;
}

export const useKanbanBoard = ({ boards, setBoards }: UseKanbanBoardParams) => {
  const [loading, setLoading] = useState(false);
  const [inviteOpenBoardId, setInviteOpenBoardId] = useState<string | null>(null);
  const [editingBoardId, setEditingBoardId] = useState<string | null>(null);
  const [editedTitle, setEditedTitle] = useState('');

  const fetchAllBoards = async () => {
    setLoading(true);
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
    } catch {
      alert('โหลดบอร์ดไม่สำเร็จ');
    } finally {
      setLoading(false);
    }
  };

  const updateBoardsColumns = (boardId: string, updater: (board: Board) => Board) => {
    setBoards(prev =>
      prev.map(board => (board.id === boardId ? updater(board) : board))
    );
  };

  const onDragEnd = (boardId: string, { source, destination }: any) => {
    if (!destination) return;
    updateBoardsColumns(boardId, board => {
      const srcIdx = board.columns.findIndex(c => c.id === source.droppableId);
      const destIdx = board.columns.findIndex(c => c.id === destination.droppableId);
      const srcTasks = [...board.columns[srcIdx].tasks];
      const [moved] = srcTasks.splice(source.index, 1);

      if (srcIdx === destIdx) {
        srcTasks.splice(destination.index, 0, moved);
        const newColumns = [...board.columns];
        newColumns[srcIdx].tasks = srcTasks;
        return { ...board, columns: newColumns };
      } else {
        const destTasks = [...board.columns[destIdx].tasks];
        destTasks.splice(destination.index, 0, moved);
        const newColumns = [...board.columns];
        newColumns[srcIdx].tasks = srcTasks;
        newColumns[destIdx].tasks = destTasks;
        return { ...board, columns: newColumns };
      }
    });
  };

  const saveTitle = async (boardId: string) => {
    if (!editedTitle.trim()) return alert('กรุณาใส่ชื่อบอร์ด');
    setLoading(true);
    try {
      const res = await updateBoard(Number(boardId), { title: editedTitle });
      setBoards(prev => prev.map(b => (b.id === boardId ? { ...b, title: res.data.title } : b)));
      setEditingBoardId(null);
    } catch {
      alert('แก้ไขชื่อบอร์ดไม่สำเร็จ');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteBoard = async (boardId: string) => {
    if (!window.confirm('ต้องการลบบอร์ดนี้ใช่ไหม?')) return;
    setLoading(true);
    try {
      await deleteBoard(Number(boardId));
      setBoards(prev => prev.filter(b => b.id !== boardId));
    } catch {
      alert('ลบบอร์ดไม่สำเร็จ');
    } finally {
      setLoading(false);
    }
  };

  const addTask = (boardId: string, colId: string, task: Task) => {
    updateBoardsColumns(boardId, board => ({
      ...board,
      columns: board.columns.map(col =>
        col.id === colId ? { ...col, tasks: [...col.tasks, task] } : col
      ),
    }));
  };

  const handleAddColumn = async (boardId: string) => {
    setLoading(true);
    try {
      const position = boards.find(b => b.id === boardId)?.columns.length ?? 0;
      const newColumn: ColumnOut = await createColumn(Number(boardId), {
        title: 'New Column',
        position,
        board_id: Number(boardId),
      });
      const newColumnFormatted: Column = { ...newColumn, id: newColumn.id.toString(), tasks: [] };
      setBoards(prev =>
        prev.map(board =>
          board.id === boardId
            ? { ...board, columns: [...board.columns, newColumnFormatted] }
            : board
        )
      );
    } catch {
      alert('เพิ่มคอลัมน์ไม่สำเร็จ');
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    inviteOpenBoardId,
    editingBoardId,
    editedTitle,
    setEditedTitle,
    setEditingBoardId,
    setInviteOpenBoardId,
    onDragEnd,
    saveTitle,
    handleDeleteBoard,
    addTask,
    handleAddColumn,
    fetchAllBoards,
  };
};
