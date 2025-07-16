import React, { useState } from 'react';
import { useInviteMember } from '../../hooks/useInviteMember';
import './InviteMemberModal.css';

interface InviteMemberModalProps {
  boardId: string;
  onClose: () => void;
}

const InviteMemberModal: React.FC<InviteMemberModalProps> = ({ boardId, onClose }) => {
  const [input, setInput] = useState('');
  const { invite, loading } = useInviteMember(boardId, onClose);

  const handleInvite = async () => {
    await invite(input);
    setInput('');
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h3>Invite Member to Board</h3>
        <input
          type="text"
          placeholder="Enter member's email or username"
          value={input}
          onChange={e => setInput(e.target.value)}
          disabled={loading}
        />
        <button onClick={handleInvite} disabled={loading || !input}>
          Invite
        </button>
        <button onClick={onClose} disabled={loading}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default InviteMemberModal;
