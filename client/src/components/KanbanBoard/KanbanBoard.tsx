import React, { useState } from 'react';
import { DragDropContext, Droppable, DropResult } from '@hello-pangea/dnd';
import KanbanColumn, { Column, Task } from '../KanbanColumn/KanbanColumn';
import { updateBoard, deleteBoard } from '../../api/boards';
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
  const [loading, setLoading] = useState(false);
  const [inviteOpenBoardId, setInviteOpenBoardId] = useState<string | null>(null);
  const [editingBoardId, setEditingBoardId] = useState<string | null>(null);
  const [editedTitle, setEditedTitle] = useState<string>('');

  const onDragEnd = (boardId: string, result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;

    setBoards(prevBoards =>
      prevBoards.map(board => {
        if (board.id !== boardId) return board;

        const srcIdx = board.columns.findIndex(c => c.id === source.droppableId);
        const destIdx = board.columns.findIndex(c => c.id === destination.droppableId);
        const srcTasks = Array.from(board.columns[srcIdx].tasks);
        const [moved] = srcTasks.splice(source.index, 1);

        if (srcIdx === destIdx) {
          srcTasks.splice(destination.index, 0, moved);
          const updatedColumns = [...board.columns];
          updatedColumns[srcIdx].tasks = srcTasks;
          return { ...board, columns: updatedColumns };
        } else {
          const destTasks = Array.from(board.columns[destIdx].tasks);
          destTasks.splice(destination.index, 0, moved);
          const updatedColumns = [...board.columns];
          updatedColumns[srcIdx].tasks = srcTasks;
          updatedColumns[destIdx].tasks = destTasks;
          return { ...board, columns: updatedColumns };
        }
      })
    );
  };

  const saveTitle = async (boardId: string) => {
    if (!editedTitle.trim()) return alert('กรุณาใส่ชื่อบอร์ด');
    setLoading(true);
    try {
      const res = await updateBoard(Number(boardId), { title: editedTitle });
      setBoards(prev =>
        prev.map(b => (b.id === boardId ? { ...b, title: res.data.title } : b))
      );
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

  const openInviteModal = (boardId: string) => setInviteOpenBoardId(boardId);
  const closeInviteModal = () => setInviteOpenBoardId(null);

  const addTask = (boardId: string, colId: string, task: Task) => {
    setBoards(prev =>
      prev.map(board =>
        board.id === boardId
          ? {
              ...board,
              columns: board.columns.map(col =>
                col.id === colId ? { ...col, tasks: [...col.tasks, task] } : col
              ),
            }
          : board
      )
    );
  };

  const handleAddColumn = (boardId: string) => {
    setBoards(prev =>
      prev.map(board =>
        board.id === boardId
          ? {
              ...board,
              columns: [
                ...board.columns,
                { id: Date.now().toString(), title: 'New Column', tasks: [] },
              ],
            }
          : board
      )
    );
  };

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
                  onClick={() => openInviteModal(board.id)}
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
            <InviteMemberModal boardId={board.id} onClose={closeInviteModal} />
          )}
        </div>
      ))}
    </div>
  );
};

export default KanbanBoard;
