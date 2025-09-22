import { ApiResponse, Client } from "../types";

export interface ClientApiService {
  getAll: () => Promise<ApiResponse<Client[] | null>>;
  create: (clientData: Omit<Client, '_id'>) => Promise<ApiResponse<Client | null>>;
  update: (id: string, clientData: Omit<Client, '_id'>) => Promise<ApiResponse<Client | null>>;
  delete: (id: string) => Promise<ApiResponse<null>>;
}

export default function ClientApiAdapter(): ClientApiService {
  const apiBaseUrl = `${import.meta.env.VITE_API_URL}/clients`;

  const getAll = async (): Promise<ApiResponse<Client[] | null>> => {
    try {
      const result = await fetch(apiBaseUrl);
      if (!result.ok) {
        return { isOk: false, message: `Error ${result.status}: ${result.statusText}` };
      }
      return await result.json();
    } catch (error) {
      return { isOk: false, message: `Error fetching data: ${(error as Error).message}` };
    }
  };

  const create = async (clientData: Omit<Client, '_id'>): Promise<ApiResponse<Client | null>> => {
    try {
      const response = await fetch(apiBaseUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(clientData),
      });
      if (!response.ok) {
        return { isOk: false, message: `Error ${response.status}: ${response.statusText}` };
      }
      return await response.json();
    } catch (error) {
      return { isOk: false, message: `Error creating client: ${(error as Error).message}` };
    }
  };

  const update = async (id: string, clientData: Omit<Client, '_id'>): Promise<ApiResponse<Client | null>> => {
    try {
      const response = await fetch(`${apiBaseUrl}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(clientData),
      });
      if (!response.ok) {
        return { isOk: false, message: `Error ${response.status}: ${response.statusText}` };
      }
      return await response.json();
    } catch (error) {
      return { isOk: false, message: `Error updating client: ${(error as Error).message}` };
    }
  };

  const deleteClient = async (id: string): Promise<ApiResponse<null>> => {
    try {
      const response = await fetch(`${apiBaseUrl}/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        return { isOk: false, message: `Error ${response.status}: ${response.statusText}` };
      }
      return { isOk: true, message: 'Client deleted successfully' };
    } catch (error) {
      return { isOk: false, message: `Error deleting client: ${(error as Error).message}` };
    }
  };

  return {
    getAll,
    create,
    update,
    delete: deleteClient,
  };
}
