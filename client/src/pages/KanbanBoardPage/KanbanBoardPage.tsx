import React, { useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import AuthModal from '../../components/AuthModal/AuthModal';
import KanbanBoard from '../../components/KanbanBoard/KanbanBoard';
import { Column } from '../../components/KanbanColumn/KanbanColumn';
import { initialColumns as mockColumns } from '../../data/mockKanbanData';
import './KanbanBoardPage.css';

const KanbanBoardPage: React.FC = () => {
  const [showAuth, setShowAuth] = useState(false);
  const [columns, setColumns] = useState<Column[]>(mockColumns);

  const handleNewBoard = () => {
    console.log('Open create board modal');
  };

  const handleInvite = () => {
    alert('Invite clicked');
  };

  const handleDeleteBoard = () => {
    alert('Delete board clicked');
  };

  const handleRenameBoard = () => {
    alert('Rename board clicked');
  };

  return (
    <div className="kanban-container">
      <Navbar
        boardTitle="Kanban Board"
        statusLabel="Active"
        onNotifyClick={() => console.log('Open notifications')}
        onSignIn={() => setShowAuth(true)}
      />

      {showAuth && (
        <AuthModal isOpen={showAuth} onClose={() => setShowAuth(false)} />
      )}

      <main className="board-content">
        <div className="board-header">
          <h2 className="board-title">Project Kanban Board</h2>
          <button className="add-board-btn" onClick={handleNewBoard}>
            + New Board
          </button>
        </div>
        <p className="board-subtitle">Manage your tasks and track progress</p>
        <KanbanBoard
          boardTitle="Project Kanban Board"
          columns={columns}
          setColumns={setColumns}
          onInvite={handleInvite}
          onDeleteBoard={handleDeleteBoard}
          onRenameBoard={handleRenameBoard}
        />
      </main>
    </div>
  );
};

export default KanbanBoardPage;
