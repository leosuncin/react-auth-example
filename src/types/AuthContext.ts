import { AuthState } from './AuthState';
import { Login } from './Login';
import { Register } from './Register';

export type AuthContext = AuthState & {
  register: (body: Register) => Promise<void>;
  login: (body: Login) => Promise<void>;
  logout: () => void;
};
