import { ApiResponse, Client } from "../types";

export interface ClientApiService {
  getAll: () => Promise<ApiResponse<Client[] | null>>;
}

export default function ClientApiAdapter(): ClientApiService {
  return {
    async getAll(): Promise<ApiResponse<Client[] | null>> {
      try {
        const result = await fetch(
          `${import.meta.env.VITE_API_URL}/clients`
        );

        if (!result.ok) {
          return {
            isOk: false,
            message: `Error ${result.status}: ${result.statusText}`,
          };
        }

        const resp: ApiResponse<Client[] | null> = await result.json();
        return resp;
      } catch (error) {
        return {
          isOk: false,
          message: `Error fetching data: ${(error as Error).message}`,
        };
      }
    },
  };
}
