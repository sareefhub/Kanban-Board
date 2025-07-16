import React from 'react';
import { DragDropContext, Droppable, DropResult } from '@hello-pangea/dnd';
import KanbanColumn, { Column, Task } from '../KanbanColumn/KanbanColumn';
import './KanbanBoard.css';

interface Props {
  columns: Column[];
  setColumns: React.Dispatch<React.SetStateAction<Column[]>>;
  boardTitle: string;
  onInvite: () => void;
  onDeleteBoard: () => void;
  onRenameBoard: () => void;
}

const KanbanBoard: React.FC<Props> = ({
  columns,
  setColumns,
  boardTitle,
  onInvite,
  onDeleteBoard,
  onRenameBoard,
}) => {
  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;

    const srcIdx = columns.findIndex(c => c.id === source.droppableId);
    const destIdx = columns.findIndex(c => c.id === destination.droppableId);
    const srcTasks = Array.from(columns[srcIdx].tasks);
    const [moved] = srcTasks.splice(source.index, 1);

    if (srcIdx === destIdx) {
      srcTasks.splice(destination.index, 0, moved);
      const updated = [...columns];
      updated[srcIdx].tasks = srcTasks;
      setColumns(updated);
    } else {
      const destTasks = Array.from(columns[destIdx].tasks);
      destTasks.splice(destination.index, 0, moved);
      const updated = [...columns];
      updated[srcIdx].tasks = srcTasks;
      updated[destIdx].tasks = destTasks;
      setColumns(updated);
    }
  };

  const addTask = (colId: string, task: Task) => {
    setColumns(cols =>
      cols.map(c =>
        c.id === colId ? { ...c, tasks: [...c.tasks, task] } : c
      )
    );
  };

  return (
    <div className="kanban-board-container">
      <div className="board-header">
        <h2>{boardTitle}</h2>
        <div>
          <button
            className="invite-btn"
            onClick={onInvite}
            title="Invite member"
          >
            <i className="fas fa-user-plus"></i>
          </button>
          <button
            className="delete-board-btn"
            onClick={onDeleteBoard}
            title="Delete board"
          >
            <i className="fas fa-trash"></i>
          </button>
          <button
            className="rename-board-btn"
            onClick={onRenameBoard}
            title="Rename board"
          >
            <i className="fas fa-edit"></i>
          </button>
        </div>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="board">
          {columns.map(col => (
            <Droppable key={col.id} droppableId={col.id} type="TASK">
              {provided => (
                <div
                  className="board-column-wrapper"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <KanbanColumn column={{ ...col, addTask }} />
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default KanbanBoard;
