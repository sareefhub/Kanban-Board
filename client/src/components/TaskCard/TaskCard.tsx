import React, { useState } from 'react';
import './TaskCard.css';
import { Task } from '../KanbanColumn/KanbanColumn';

interface Props {
  task: Task;
  onEdit: (updated: Task) => void;
  onDelete: (taskId: string) => void;
  onAssign: (taskId: string) => void;
}

const TaskCard: React.FC<Props> = ({ task, onEdit, onDelete, onAssign }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [desc, setDesc] = useState(task.description);
  const [tags, setTags] = useState(task.tags ? task.tags.join(', ') : '');

  const save = () => {
    onEdit({
      ...task,
      title: title.trim(),
      description: desc.trim(),
      tags: tags.split(',').map(t => t.trim()).filter(Boolean),
    });
    setIsEditing(false);
  };

  const tagsArray = task.tags ?? [];

  return (
    <div className="task-card">
      {isEditing ? (
        <>
          <input
            className="edit-input"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Task title"
          />
          <textarea
            className="edit-textarea"
            value={desc}
            onChange={e => setDesc(e.target.value)}
            placeholder="Task description"
          />
          <input
            className="edit-input"
            value={tags}
            onChange={e => setTags(e.target.value)}
            placeholder="Tags, comma separated"
          />
          <div className="card-actions">
            <button className="action-btn" onClick={save} disabled={!title.trim()}>
              Save
            </button>
            <button className="action-btn" onClick={() => setIsEditing(false)}>
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="task-header">
            <span className="task-title-text">{task.title}</span>
            <div className="card-actions">
              <button className="action-btn" onClick={() => setIsEditing(true)}>
                Edit
              </button>
              <button className="action-btn" onClick={() => onDelete(task.id)}>
                Delete
              </button>
              <button className="action-btn" onClick={() => onAssign(task.id)}>
                Assign
              </button>
            </div>
          </div>
          <p className="task-desc">{task.description}</p>
          <div className="tags">
            {tagsArray.map(tag => (
              <span key={tag} className="tag">{tag}</span>
            ))}
          </div>
          {task.assignee && (
            <div className="assignee-info">
              <strong>Assignee:</strong> {task.assignee}
            </div>
          )}
          {task.date && <span className="date">{task.date}</span>}
        </>
      )}
    </div>
  );
};

export default TaskCard;
