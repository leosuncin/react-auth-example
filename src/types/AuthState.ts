import type { User } from './User';

export type AuthState = {
  authenticated: boolean;
  token?: string | null;
  user?: User | null;
  error?: string | null;
};
