import { ApiResponse, Service } from "../types";

export interface ServiceApiService {
  getAll: () => Promise<ApiResponse<Service[] | null>>;
  create: (serviceData: Omit<Service, '_id'>) => Promise<ApiResponse<Service | null>>;
  update: (id: string, serviceData: Omit<Service, '_id'>) => Promise<ApiResponse<Service | null>>;
  delete: (id: string) => Promise<ApiResponse<null>>;
}

export default function ServiceApiAdapter(): ServiceApiService {
  const apiBaseUrl = `${import.meta.env.VITE_API_URL}/services`;

  const getAll = async (): Promise<ApiResponse<Service[] | null>> => {
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

  const create = async (serviceData: Omit<Service, '_id'>): Promise<ApiResponse<Service | null>> => {
    try {
      const response = await fetch(apiBaseUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(serviceData),
      });
      if (!response.ok) {
        return { isOk: false, message: `Error ${response.status}: ${response.statusText}` };
      }
      return await response.json();
    } catch (error) {
      return { isOk: false, message: `Error creating service: ${(error as Error).message}` };
    }
  };

  const update = async (id: string, serviceData: Omit<Service, '_id'>): Promise<ApiResponse<Service | null>> => {
    try {
      const response = await fetch(`${apiBaseUrl}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(serviceData),
      });
      if (!response.ok) {
        return { isOk: false, message: `Error ${response.status}: ${response.statusText}` };
      }
      return await response.json();
    } catch (error) {
      return { isOk: false, message: `Error updating service: ${(error as Error).message}` };
    }
  };

  const deleteService = async (id: string): Promise<ApiResponse<null>> => {
    try {
      const response = await fetch(`${apiBaseUrl}/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        return { isOk: false, message: `Error ${response.status}: ${response.statusText}` };
      }
      return { isOk: true, message: 'Service deleted successfully' };
    } catch (error) {
      return { isOk: false, message: `Error deleting service: ${(error as Error).message}` };
    }
  };

  return {
    getAll,
    create,
    update,
    delete: deleteService,
  };
}
