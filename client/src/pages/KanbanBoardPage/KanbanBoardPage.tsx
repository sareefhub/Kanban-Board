// src/pages/KanbanBoardPage/KanbanBoardPage.tsx
import React, { useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import AuthModal from '../../components/AuthModal/AuthModal';
import KanbanBoard from '../../components/KanbanBoard/KanbanBoard';
import { Column } from '../../components/KanbanColumn/KanbanColumn';
import { useAuth } from '../../context/AuthContext';
import { createBoard, deleteBoard } from '../../api/boards';
import { useBoards } from '../../hooks/useBoards';
import './KanbanBoardPage.css';

const KanbanBoardPage: React.FC = () => {
  const { user: authUser, logout } = useAuth();
  const [showAuth, setShowAuth] = useState(false);

  const { boards, setBoards, loading, error } = useBoards(authUser);

  const handleLoginSuccess = () => {
    setShowAuth(false);
  };

  const handleNewBoard = async () => {
    try {
      const response = await createBoard({
        title: `Project Kanban Board ${boards.length + 1}`,
      });
      const newBoard = {
        id: response.data.id.toString(),
        title: response.data.title,
        columns: [],
      };
      setBoards(prev => [...prev, newBoard]);
    } catch (error) {
      console.error('Failed to create board:', error);
      alert('สร้างบอร์ดใหม่ไม่สำเร็จ กรุณาลองใหม่อีกครั้ง');
    }
  };

  const handleInvite = (boardId: string) => {
    alert(`Invite clicked for board ${boardId}`);
  };

  const handleDeleteBoard = async (boardId: string) => {
    try {
      await deleteBoard(Number(boardId));
      setBoards(prev => prev.filter(b => b.id !== boardId));
    } catch (error) {
      console.error('Failed to delete board:', error);
      alert('ลบบอร์ดไม่สำเร็จ กรุณาลองใหม่');
    }
  };

  const handleRenameBoard = (boardId: string) => {
    const newTitle = prompt('Enter new board name:');
    if (!newTitle) return;
    setBoards(prev =>
      prev.map(b => (b.id === boardId ? { ...b, title: newTitle } : b))
    );
  };

  const handleAddColumn = (boardId: string) => {
    setBoards(prev =>
      prev.map(b => {
        if (b.id === boardId) {
          const newColumn: Column = {
            id: Date.now().toString(),
            title: 'New Column',
            tasks: [],
          };
          return { ...b, columns: [...b.columns, newColumn] };
        }
        return b;
      })
    );
  };

  const setBoardColumns = (boardId: string, newColumns: Column[]) => {
    setBoards(prev =>
      prev.map(b => (b.id === boardId ? { ...b, columns: newColumns } : b))
    );
  };

  if (loading) {
    return <div>Loading boards...</div>;
  }

  if (error) {
    return <div>Error loading boards: {error}</div>;
  }

  return (
    <div className="kanban-container">
      <Navbar
        boardTitle="Kanban Boards"
        statusLabel="Active"
        username={authUser?.username ?? null}
        onNotifyClick={() => console.log('Open notifications')}
        onSignIn={() => setShowAuth(true)}
        onLogout={logout}
      />

      {showAuth && (
        <AuthModal
          isOpen={showAuth}
          onClose={() => setShowAuth(false)}
          onLoginSuccess={handleLoginSuccess}
        />
      )}

      <main className="board-content">
        <div className="board-header">
          <h2 className="board-title">All Kanban Boards</h2>
          <button className="add-board-btn" onClick={handleNewBoard}>
            + New Board
          </button>
        </div>
        <p className="board-subtitle">Manage your tasks and track progress</p>

        {boards.map(board => (
          <KanbanBoard
            key={board.id}
            boardTitle={board.title}
            columns={board.columns}
            setColumns={newCols => setBoardColumns(board.id, newCols as Column[])}
            onInvite={() => handleInvite(board.id)}
            onDeleteBoard={() => handleDeleteBoard(board.id)}
            onRenameBoard={() => handleRenameBoard(board.id)}
            onAddColumn={() => handleAddColumn(board.id)}
          />
        ))}
      </main>
    </div>
  );
};

export default KanbanBoardPage;
