import React from 'react';
import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import KanbanColumn from '../KanbanColumn/KanbanColumn';
import { Task, Column } from '../KanbanColumn/KanbanColumn';
import { useKanbanBoard } from '../../hooks/useKanbanBoard';
import InviteMemberModal from '../InviteMemberModal/InviteMemberModal';
import './KanbanBoard.css';

interface Board {
  id: string;
  title: string;
  columns: Column[];
}

interface Props {
  boards: Board[];
  setBoards: React.Dispatch<React.SetStateAction<Board[]>>;
}

const KanbanBoard: React.FC<Props> = ({ boards, setBoards }) => {
  const {
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
  } = useKanbanBoard({ boards, setBoards });

  return (
    <div>
      {boards.map(board => (
        <div key={board.id} className="kanban-board-container">
          <div className="board-header">
            {editingBoardId === board.id ? (
              <>
                <input
                  type="text"
                  value={editedTitle}
                  onChange={e => setEditedTitle(e.target.value)}
                  disabled={loading}
                  autoFocus
                />
                <button onClick={() => saveTitle(board.id)} disabled={loading}>
                  บันทึก
                </button>
                <button onClick={() => setEditingBoardId(null)} disabled={loading}>
                  ยกเลิก
                </button>
              </>
            ) : (
              <>
                <h2>{board.title}</h2>
                <button
                  onClick={() => setInviteOpenBoardId(board.id)}
                  title="Invite member"
                  disabled={loading}
                >
                  <i className="fas fa-user-plus"></i>
                </button>
                <button
                  onClick={() => {
                    setEditingBoardId(board.id);
                    setEditedTitle(board.title);
                  }}
                  title="Rename board"
                  disabled={loading}
                  style={{ marginLeft: 'auto', marginRight: '0.5rem' }}
                >
                  <i className="fas fa-edit"></i>
                </button>
                <button
                  onClick={() => handleDeleteBoard(board.id)}
                  title="Delete board"
                  disabled={loading}
                >
                  <i className="fas fa-trash"></i>
                </button>
              </>
            )}
          </div>

          <DragDropContext onDragEnd={result => onDragEnd(board.id, result)}>
            <div className="board">
              {board.columns.map(col => (
                <Droppable key={col.id} droppableId={col.id} type="TASK">
                  {provided => (
                    <div
                      className="board-column-wrapper"
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                    >
                      <KanbanColumn
                        column={{
                          ...col,
                          addTask: (task: Task) => addTask(board.id, col.id, task),
                        }}
                        boardId={board.id}
                      />
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              ))}
              <div className="add-column-wrapper">
                <button
                  className="add-column-btn"
                  onClick={() => handleAddColumn(board.id)}
                  disabled={loading}
                >
                  + Add Column
                </button>
              </div>
            </div>
          </DragDropContext>

          {inviteOpenBoardId === board.id && (
            <InviteMemberModal boardId={board.id} onClose={() => setInviteOpenBoardId(null)} />
          )}
        </div>
      ))}
    </div>
  );
};

export default KanbanBoard;
