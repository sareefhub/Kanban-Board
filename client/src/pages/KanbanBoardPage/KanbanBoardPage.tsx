import React, { useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import AuthModal from '../../components/AuthModal/AuthModal';
import KanbanBoard from '../../components/KanbanBoard/KanbanBoard';
import { useAuth } from '../../context/AuthContext';
import { createBoard } from '../../api/boards';
import { useBoards } from '../../hooks/useBoards';
import './KanbanBoardPage.css';

const KanbanBoardPage: React.FC = () => {
  const { user: authUser, logout } = useAuth();
  const [showAuth, setShowAuth] = useState(false);

  const { boards, setBoards, loading, error } = useBoards(authUser);

  const handleLoginSuccess = () => setShowAuth(false);

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
    } catch {
      alert('สร้างบอร์ดใหม่ไม่สำเร็จ กรุณาลองใหม่อีกครั้ง');
    }
  };

  if (loading) return <div>Loading boards...</div>;
  if (error) return <div>Error loading boards: {error}</div>;

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

        <KanbanBoard boards={boards} setBoards={setBoards} />
      </main>
    </div>
  );
};

export default KanbanBoardPage;
