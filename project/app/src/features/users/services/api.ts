import { User } from '../types';
import { ApiResponse } from '../../tickets/types'; // Re-using ApiResponse from tickets

export async function getUsers(): Promise<User[]> {
  try {
    const result = await fetch(
      `${import.meta.env.VITE_API_URL}/users`
    );

    if (!result.ok) {
      throw new Error(`Error ${result.status}: ${result.statusText}`);
    }

    const resp: ApiResponse<User[]> = await result.json();

    if (resp.isOk && resp.data) {
      return resp.data;
    }

    throw new Error(resp.message || 'Failed to get users');

  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
}
