// src/components/InviteMemberModal/InviteMemberModal.tsx
import React, { useState } from 'react';

interface InviteMemberModalProps {
  boardId: string;
  onClose: () => void;
  // เพิ่ม props อื่นๆได้ถ้าต้องการ
}

const InviteMemberModal: React.FC<InviteMemberModalProps> = ({ boardId, onClose }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInvite = async () => {
    setLoading(true);
    try {
      // เรียก API เชิญสมาชิก (ปรับเป็น API จริงของคุณ)
      alert(`Invite ${email} to board ${boardId}`);
      setEmail('');
      onClose();
    } catch (error) {
      alert('เชิญสมาชิกไม่สำเร็จ');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h3>Invite Member to Board</h3>
        <input
          type="email"
          placeholder="Enter member's email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          disabled={loading}
        />
        <button onClick={handleInvite} disabled={loading || !email}>
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
