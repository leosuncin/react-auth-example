import type { AuthAction } from '../types/AuthAction';
import type { AuthState } from '../types/AuthState';
import { AuthStorageEnum } from '../types/AuthStorageEnum';
import type { User } from '../types/User';

export function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'register':
    case 'login':
      return {
        authenticated: true,
        ...action.payload,
      };

    case 'logout':
      return {
        authenticated: false,
      };

    case 'error':
      return {
        authenticated: false,
        error: action.payload.message,
      };

    default:
      return state;
  }
}

export function initAuthState(): AuthState {
  try {
    const token = localStorage.getItem(AuthStorageEnum.token);
    const user: User = JSON.parse(
      localStorage.getItem(AuthStorageEnum.user) || '{}',
    );
    const authenticated = Boolean(token) && Boolean(user);

    return { authenticated, token, user };
  } catch (error) {
    return { authenticated: false, error: error.message };
  }
}
