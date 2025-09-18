import { User, Session, ApiResponse } from "../types";
import { ApiService } from "../services";

export default function ApiAdapter(): ApiService {
  return {
    async login(user: User): Promise<ApiResponse<Session | null>> {
      try {
        const config: RequestInit = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        };

        const result = await fetch(
          `${import.meta.env.VITE_API_URL}/auth/login`,
          config
        );

        if (!result.ok) {
          return {
            isOk: false,
            message: `Error ${result.status}: ${result.statusText}`,
          };
        }

        const resp: ApiResponse<Session | null> = await result.json();
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
