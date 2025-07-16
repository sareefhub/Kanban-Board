import React, { useState, useRef, useEffect } from 'react';
import { Droppable, Draggable } from '@hello-pangea/dnd';
import TaskCard from '../TaskCard/TaskCard';
import './KanbanColumn.css';

export interface Task {
  id: string;
  title: string;
  description: string;
  tags: string[];
  priority: 'low' | 'medium' | 'high';
  assignee?: string;
  date?: string;
}

export interface Column {
  id: string;
  title: string;
  tasks: Task[];
  addTask?: (task: Task) => void;
}

const KanbanColumn: React.FC<{ column: Column }> = ({ column }) => {
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

  const submit = () => {
    const task: Task = {
      id: `${Date.now()}`,
      title: title.trim(),
      description: desc.trim(),
      tags: tags.split(',').map(t => t.trim()).filter(Boolean),
      priority: 'low',
    };
    column.addTask?.(task);
    setEditing(false);
    setTitle('');
    setDesc('');
    setTags('');
  };

  return (
    <div className="kanban-column">
      <header className="column-header">
        <h3>{column.title}</h3>
        <span className="task-count">{column.tasks.length}</span>
        <div className="column-menu" ref={menuRef}>
          <button className="menu-btn" onClick={() => setMenuOpen(o => !o)}>⋯</button>
          {menuOpen && (
            <ul className="menu-list">
              <li className="menu-item edit" onClick={() => alert('Edit Column')}>
                Edit Column
              </li>
              <li className="menu-item delete" onClick={() => alert('Delete Column')}>
                Delete Column
              </li>
            </ul>
          )}
        </div>
      </header>

      <Droppable droppableId={column.id} type="TASK">
        {provided => (
          <div className="tasks-list" ref={provided.innerRef} {...provided.droppableProps}>
            {column.tasks.map((task, idx) => (
              <Draggable key={task.id} draggableId={task.id} index={idx}>
                {prov => (
                  <div
                    ref={prov.innerRef}
                    {...prov.draggableProps}
                    {...prov.dragHandleProps}
                  >
                    <TaskCard
                      task={task}
                      onEdit={updated => alert('Edit Task: ' + updated.id)}
                      onDelete={id => alert('Delete Task: ' + id)}
                      onAssign={id => alert('Assign Task: ' + id)}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      {editing ? (
        <div className="task-form">
          <input
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Task title"
          />
          <textarea
            value={desc}
            onChange={e => setDesc(e.target.value)}
            placeholder="Task description"
          />
          <input
            value={tags}
            onChange={e => setTags(e.target.value)}
            placeholder="Tags, comma separated"
          />
          <div className="form-actions">
            <button className="add-btn" onClick={submit} disabled={!title.trim()}>
              Add Task
            </button>
            <button className="cancel-btn" onClick={() => setEditing(false)}>
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <button className="add-task" onClick={() => setEditing(true)}>
          + Add a task
        </button>
      )}
    </div>
  );
};

export default KanbanColumn;
