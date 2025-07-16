import { useState } from 'react';
import { searchUsers, inviteMemberToBoard, User } from '../api/users';

export const useInviteMember = (boardId: string, onClose: () => void) => {
  const [loading, setLoading] = useState(false);

  const invite = async (input: string) => {
    setLoading(true);
    try {
      const users = await searchUsers(input);
      if (users.length === 0) {
        alert('ไม่พบผู้ใช้');
        setLoading(false);
        return;
      }
      const user = users[0];
      await inviteMemberToBoard(boardId, user.id);
      alert(`เชิญ ${user.username} สำเร็จ`);
      onClose();
    } catch {
      alert('เชิญสมาชิกไม่สำเร็จ');
    } finally {
      setLoading(false);
    }
  };

  return { invite, loading };
};
