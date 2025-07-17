import { useState, useEffect, useRef } from 'react';
import { Column, Task } from '../components/KanbanColumn/KanbanColumn';
import { updateColumn, deleteColumn } from '../api/columns';

export const useColumns = (column: Column, boardId: number, setColumns: React.Dispatch<React.SetStateAction<Column[]>>) => {
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

  const handleEditColumn = () => {
    const newTitle = prompt('ชื่อคอลัมน์ใหม่', column.title);
    if (newTitle && newTitle.trim() !== '') {
        updateColumn(boardId, Number(column.id), { title: newTitle.trim() })
        .then(updated => {
            const updatedColumn: Column = {
              ...updated,
              id: updated.id.toString(),
              tasks: column.tasks || [],
            };
            setColumns(cols =>
              cols.map(c =>
                c.id === column.id ? updatedColumn : c
              )
            );
        })
        .catch(() => alert('แก้ไขคอลัมน์ไม่สำเร็จ'));
    }
    setMenuOpen(false);
  };

  const handleDeleteColumn = () => {
    if (window.confirm('ต้องการลบคอลัมน์นี้ใช่ไหม?')) {
      deleteColumn(boardId, Number(column.id))
        .then(() => {
          setColumns(cols => cols.filter(c => c.id !== column.id));
        })
        .catch(() => alert('ลบคอลัมน์ไม่สำเร็จ'));
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
