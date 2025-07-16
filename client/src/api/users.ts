import { api } from './client';

export interface User {
  id: number;
  email: string;
  username: string;
}

export async function searchUsers(query: string): Promise<User[]> {
  try {
    const response = await api.get<User[]>('/users', {
      params: { search: query },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.detail || 'Failed to search users');
  }
}

export async function inviteMemberToBoard(boardId: string, userId: number) {
  try {
    const response = await api.post(`/boards/${boardId}/members`, {
      user_id: userId,
    });
    return response;
  } catch (error: any) {
    throw new Error(error.response?.data?.detail || 'Failed to invite member');
  }
}
