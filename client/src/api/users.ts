import axios from 'axios';

export interface User {
  id: number;
  email: string;
  username: string;
}

export const searchUsers = async (query: string): Promise<User[]> => {
  const response = await axios.get<User[]>('/api/users', {
    params: { search: query },
  });
  return response.data;
};

export const inviteMemberToBoard = async (boardId: string, userId: number) => {
  await axios.post(`/boards/${boardId}/members`, {
    user_id: userId,
  });
};
