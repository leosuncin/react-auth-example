import type { AuthState } from './AuthState';
import type { Login } from './Login';
import type { Register } from './Register';

export type AuthContext = AuthState & {
  register: (body: Register) => Promise<void>;
  login: (body: Login) => Promise<void>;
  logout: () => void;
};
