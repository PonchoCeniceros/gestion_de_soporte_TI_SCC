import { Role } from "./role";

/**
 *
 */
export default interface Session {
  token: string;
  expiresAt: number;
  role: Role;
}
