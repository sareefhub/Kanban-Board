import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import AuthModal from '../../components/AuthModal/AuthModal';
import KanbanBoard from '../../components/KanbanBoard/KanbanBoard';
import { Column } from '../../components/KanbanColumn/KanbanColumn';
import { initialColumns as mockColumns } from '../../data/mockKanbanData';
import { useAuth } from '../../context/AuthContext';
import './KanbanBoardPage.css';

interface Board {
  id: string;
  title: string;
  columns: Column[];
}

const KanbanBoardPage: React.FC = () => {
  const { user: authUser, logout } = useAuth();
  const [showAuth, setShowAuth] = useState(false);
  const [boards, setBoards] = useState<Board[]>([
    {
      id: Date.now().toString(),
      title: 'Project Kanban Board 1',
      columns: mockColumns,
    },
  ]);

  const handleLoginSuccess = () => {
    setShowAuth(false);
  };

  const handleNewBoard = () => {
    const newBoard: Board = {
      id: Date.now().toString(),
      title: `Project Kanban Board ${boards.length + 1}`,
      columns: [],
    };
    setBoards(prev => [...prev, newBoard]);
  };

  const handleInvite = (boardId: string) => {
    alert(`Invite clicked for board ${boardId}`);
  };

  const handleDeleteBoard = (boardId: string) => {
    setBoards(prev => prev.filter(b => b.id !== boardId));
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
