import { ApiResponse, Service } from "../types";

export interface ServiceApiService {
  getAll: () => Promise<ApiResponse<Service[] | null>>;
}

export default function ServiceApiAdapter(): ServiceApiService {
  return {
    async getAll(): Promise<ApiResponse<Service[] | null>> {
      try {
        const result = await fetch(
          `${import.meta.env.VITE_API_URL}/services`
        );

        if (!result.ok) {
          return {
            isOk: false,
            message: `Error ${result.status}: ${result.statusText}`,
          };
        }

        const resp: ApiResponse<Service[] | null> = await result.json();
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
