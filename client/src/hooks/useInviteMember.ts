import { useState } from 'react';
import { searchUsers, inviteMemberToBoard, User } from '../api/users';

export const useInviteMember = (
  boardId: string,
  currentUserId: number,
  onClose: () => void
) => {
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
      const user = users.find(u => u.id !== currentUserId);
      if (!user) {
        alert('ไม่พบผู้ใช้ที่ถูกต้อง');
        setLoading(false);
        return;
      }
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
