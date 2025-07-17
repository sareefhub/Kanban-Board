// src/hooks/useColumns.ts
import { useState, useEffect, useRef } from 'react';
import { Column, Task } from '../components/KanbanColumn/KanbanColumn';
import { updateColumn, deleteColumn } from '../api/columns';

export const useColumns = (
  column: Column,
  boardId: string,
  fetchAllBoards: () => Promise<void>
) => {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [tags, setTags] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const submitTask = () => {
    const task: Task = {
      id: `${Date.now()}`,
      title: title.trim(),
      description: desc.trim(),
      tags: tags.split(',').map((t: string) => t.trim()).filter(Boolean),
      priority: 'low',
    };
    column.addTask?.(task);
    setEditing(false);
    setTitle('');
    setDesc('');
    setTags('');
  };

  const handleEditColumn = async () => {
    const newTitle = prompt('ชื่อคอลัมน์ใหม่', column.title);
    if (newTitle && newTitle.trim() !== '') {
      try {
        await updateColumn(Number(boardId), Number(column.id), { title: newTitle.trim() });
        await fetchAllBoards();
      } catch {
        alert('แก้ไขคอลัมน์ไม่สำเร็จ');
      }
    }
    setMenuOpen(false);
  };

  const handleDeleteColumn = async () => {
    if (window.confirm('ต้องการลบคอลัมน์นี้ใช่ไหม?')) {
      try {
        await deleteColumn(Number(boardId), Number(column.id));
        await fetchAllBoards();
      } catch {
        alert('ลบคอลัมน์ไม่สำเร็จ');
      }
    }
    setMenuOpen(false);
  };

  return {
    editing,
    setEditing,
    title,
    setTitle,
    desc,
    setDesc,
    tags,
    setTags,
    menuOpen,
    setMenuOpen,
    menuRef,
    submitTask,
    handleEditColumn,
    handleDeleteColumn,
  };
};
