import { ApiResponse, Ticket, TicketStatus, PaginatedTickets } from "../types";

export interface TicketFilters {
  status?: TicketStatus | '';
  date?: string;
  service?: string;
  page?: number;
}

export interface TicketApiService {
  getAll: (filters: TicketFilters) => Promise<ApiResponse<PaginatedTickets | null>>;
  create: (ticket: Omit<Ticket, '_id' | 'createdAt' | 'updatedAt' | 'client' | 'service' | 'status' | 'statusHistory' | 'assignedTo'> & { client: string, service: string }) => Promise<ApiResponse<Ticket | null>>;
  updateStatus: (id: string, status: TicketStatus) => Promise<ApiResponse<Ticket | null>>;
  assignTicket: (id: string, userId: string) => Promise<ApiResponse<Ticket | null>>;
}

export default function TicketApiAdapter(): TicketApiService {
  const getAll = async (filters: TicketFilters): Promise<ApiResponse<PaginatedTickets | null>> => {
    try {
      const params = new URLSearchParams();
      if (filters.status) {
        params.append('status', filters.status);
      }
      if (filters.date) {
        params.append('date', filters.date);
      }
      if (filters.service) {
        params.append('service', filters.service);
      }
      if (filters.page) {
        params.append('page', filters.page.toString());
      }

      const result = await fetch(
        `${import.meta.env.VITE_API_URL}/tickets?${params.toString()}`
      );

      if (!result.ok) {
        return {
          isOk: false,
          message: `Error ${result.status}: ${result.statusText}`,
        };
      }

      const resp: ApiResponse<PaginatedTickets | null> = await result.json();
      return resp;
    } catch (error) {
      return {
        isOk: false,
        message: `Error fetching data: ${(error as Error).message}`,
      };
    }
  };

  const create = async (ticket: Omit<Ticket, '_id' | 'createdAt' | 'updatedAt' | 'client' | 'service' | 'status' | 'statusHistory' | 'assignedTo'> & { client: string, service: string }): Promise<ApiResponse<Ticket | null>> => {
      try {
        const config: RequestInit = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(ticket),
        };

        const result = await fetch(
          `${import.meta.env.VITE_API_URL}/tickets`,
          config
        );

        if (!result.ok) {
          return {
            isOk: false,
            message: `Error ${result.status}: ${result.statusText}`,
          };
        }

        const resp: ApiResponse<Ticket | null> = await result.json();
        return resp;
      } catch (error) {
        return {
          isOk: false,
          message: `Error fetching data: ${(error as Error).message}`,
        };
      }
  }

  const updateStatus = async (id: string, status: TicketStatus): Promise<ApiResponse<Ticket | null>> => {
    try {
      const config: RequestInit = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      };

      const result = await fetch(
        `${import.meta.env.VITE_API_URL}/tickets/${id}/status`,
        config
      );

      if (!result.ok) {
        return {
          isOk: false,
          message: `Error ${result.status}: ${result.statusText}`,
        };
      }

      const resp: ApiResponse<Ticket | null> = await result.json();
      return resp;
    } catch (error) {
      return {
        isOk: false,
        message: `Error fetching data: ${(error as Error).message}`,
      };
    }
  }

  const assignTicket = async (id: string, userId: string): Promise<ApiResponse<Ticket | null>> => {
    try {
      const config: RequestInit = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      };

      const result = await fetch(
        `${import.meta.env.VITE_API_URL}/tickets/${id}/assign`,
        config
      );

      if (!result.ok) {
        return {
          isOk: false,
          message: `Error ${result.status}: ${result.statusText}`,
        };
      }

      const resp: ApiResponse<Ticket | null> = await result.json();
      return resp;
    } catch (error) {
      return {
        isOk: false,
        message: `Error fetching data: ${(error as Error).message}`,
      };
    }
  }

  return {
      getAll,
      create,
      updateStatus,
      assignTicket
  }
}
