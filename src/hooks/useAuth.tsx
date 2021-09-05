import { createContext, useContext, useReducer } from 'react';

import type { AuthContext as AuthContextType } from '../types/AuthContext';
import { AuthStorageEnum } from '../types/AuthStorageEnum';
import { login } from '../utils/login';
import { register } from '../utils/register';
import { authReducer, initAuthState } from './authReducer';

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider(
  props: React.PropsWithChildren<{ value?: AuthContextType }>
) {
  const [state, dispatch] = useReducer(
    authReducer,
    { authenticated: false },
    initAuthState
  );
  const contextValue: AuthContextType = {
    ...state,
    async register(body) {
      try {
        const payload = await register(body);
        localStorage.setItem(AuthStorageEnum.token, payload.token);
        localStorage.setItem(
          AuthStorageEnum.user,
          JSON.stringify(payload.user)
        );
        dispatch({ type: 'register', payload });
      } catch (error) {
        if (error instanceof Error) dispatch({ type: 'error', payload: error });
      }
    },
    async login(body) {
      try {
        const payload = await login(body);
        localStorage.setItem(AuthStorageEnum.token, payload.token);
        localStorage.setItem(
          AuthStorageEnum.user,
          JSON.stringify(payload.user)
        );
        dispatch({ type: 'login', payload });
      } catch (error) {
        if (error instanceof Error) dispatch({ type: 'error', payload: error });
      }
    },
    logout() {
      try {
        localStorage.removeItem(AuthStorageEnum.token);
        localStorage.removeItem(AuthStorageEnum.user);
        dispatch({ type: 'logout' });
      } catch (error) {
        if (error instanceof Error) dispatch({ type: 'error', payload: error });
      }
    },
  };

  return <AuthContext.Provider value={contextValue} {...props} />;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) throw new Error('useAuth must be used within a AuthProvider');

  return context;
}
