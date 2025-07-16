import React, { useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import AuthModal from '../../components/AuthModal/AuthModal';
import KanbanBoard from '../../components/KanbanBoard/KanbanBoard';
import { Column } from '../../components/KanbanColumn/KanbanColumn';
import { initialColumns as mockColumns } from '../../data/mockKanbanData';
import { useAuth } from '../../context/AuthContext';
import './KanbanBoardPage.css';

const KanbanBoardPage: React.FC = () => {
  const [showAuth, setShowAuth] = useState(false);
  const [columns, setColumns] = useState<Column[]>(mockColumns);
  const { user, logout } = useAuth();

  return (
    <div className="kanban-container">
      <Navbar
        boardTitle="Kanban Board"
        statusLabel="Active"
        username={user?.username ?? null}
        onNotifyClick={() => console.log('Open notifications')}
        onSignIn={() => setShowAuth(true)}
        onLogout={logout}
      />

      {showAuth && (
        <AuthModal isOpen={showAuth} onClose={() => setShowAuth(false)} />
      )}

      <main className="board-content">
        <div className="board-header">
          <h2 className="board-title">Project Kanban Board</h2>
          <button className="add-board-btn" onClick={() => console.log('Open create board modal')}>
            + New Board
          </button>
        </div>
        <p className="board-subtitle">Manage your tasks and track progress</p>
        <KanbanBoard columns={columns} setColumns={setColumns} />
      </main>
    </div>
  );
};

export default KanbanBoardPage;
