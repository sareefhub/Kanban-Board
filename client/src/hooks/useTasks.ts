// src/hooks/useTasks.ts
import { useState, useEffect } from 'react';
import { fetchTasks, createTask, updateTask, deleteTask, reorderTask } from '../api/task';
import type { TaskOut, TaskCreate, TaskUpdate } from '../types/task';

export function useTasks(columnId: number) {
  const [tasks, setTasks] = useState<TaskOut[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadTasks = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchTasks(columnId);
      setTasks(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (columnId) loadTasks();
  }, [columnId]);

  const addTask = async (task: TaskCreate) => {
    const newTask = await createTask(columnId, task);
    setTasks(prev => [...prev, newTask]);
  };

  const editTask = async (taskId: number, task: TaskUpdate) => {
    const updatedTask = await updateTask(columnId, taskId, task);
    setTasks(prev => prev.map(t => (t.id === taskId ? updatedTask : t)));
  };

  const removeTask = async (taskId: number) => {
    await deleteTask(columnId, taskId);
    setTasks(prev => prev.filter(t => t.id !== taskId));
  };

  const changePosition = async (taskId: number, position: number) => {
    const updatedTask = await reorderTask(columnId, taskId, position);
    setTasks(prev => prev.map(t => (t.id === taskId ? updatedTask : t)));
  };

  return { tasks, loading, error, addTask, editTask, removeTask, changePosition, loadTasks };
}
