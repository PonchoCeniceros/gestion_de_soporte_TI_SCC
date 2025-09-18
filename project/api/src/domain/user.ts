import { Role } from "./role";

/**
 *
 */
export default interface User {
  name: string;
  password: string;
  role: Role;
}
