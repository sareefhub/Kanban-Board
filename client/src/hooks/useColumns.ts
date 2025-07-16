import { useState } from 'react';
import { createColumn, updateColumn, deleteColumn, ColumnOut } from '../api/columns';

export const useColumns = (
  boardId: number,
  setColumns: React.Dispatch<React.SetStateAction<ColumnOut[]>>
) => {
  const [loading, setLoading] = useState(false);

  const addColumn = async (title: string) => {
    setLoading(true);
    try {
      const position = 0; // กำหนดตำแหน่ง หรือถ้ามี columns ให้ส่งความยาวแทน
      const newCol = await createColumn(boardId, { title, position, board_id: boardId });
      setColumns(cols => [...cols, newCol]);
    } catch {
      alert('สร้างคอลัมน์ไม่สำเร็จ');
    } finally {
      setLoading(false);
    }
  };

  const editColumn = async (columnId: number, title: string) => {
    setLoading(true);
    try {
      const updated = await updateColumn(boardId, columnId, { title });
      setColumns(cols => cols.map(c => (c.id === columnId ? updated : c)));
    } catch {
      alert('แก้ไขคอลัมน์ไม่สำเร็จ');
    } finally {
      setLoading(false);
    }
  };

  const removeColumn = async (columnId: number) => {
    if (!window.confirm('ต้องการลบคอลัมน์นี้ใช่ไหม?')) return;
    setLoading(true);
    try {
      await deleteColumn(boardId, columnId);
      setColumns(cols => cols.filter(c => c.id !== columnId));
    } catch {
      alert('ลบคอลัมน์ไม่สำเร็จ');
    } finally {
      setLoading(false);
    }
  };

  return { addColumn, editColumn, removeColumn, loading };
};
