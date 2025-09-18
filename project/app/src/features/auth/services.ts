import { User, Session, ApiResponse } from "./types";

export interface ApiService {
  login: (user: User) => Promise<ApiResponse<Session | null>>;
}

export type SignInAction = (session: Session) => void;
export type SignOutAction = () => void;

export async function authenticate(
  user: User,
  api: ApiService,
  signIn: SignInAction
): Promise<boolean> {
  const resp = await api.login(user);

  if (resp.data) {
    const session: Session = resp.data;
    signIn(session);
    return true;
  }

  return false;
}
