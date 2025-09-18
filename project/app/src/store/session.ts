import { Session } from '../features/auth/types';
import { create } from 'zustand';

interface SessionState {
  session: Session | null;
  isAuthenticated: boolean;
  signIn: (session: Session) => void;
  signOut: () => void;
}

const useSession = create<SessionState>((set) => ({
  session: null,
  isAuthenticated: false,
  signIn: (session: Session) => set({ session, isAuthenticated: true }),
  signOut: () => set({ session: null, isAuthenticated: false }),
}));

export default useSession;
