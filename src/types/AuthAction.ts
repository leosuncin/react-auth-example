import { AuthResp } from './AuthResp';

type Action<T extends string, P = Record<string, any>> = {
  type: T;
  payload: P;
};
type LoginAction = Action<'login', AuthResp>;
type RegisterAction = Action<'register', AuthResp>;
type LogoutAction = { type: 'logout' };
type ErrorAction = Action<'error', Error>;

export type AuthAction = LoginAction | RegisterAction | LogoutAction | ErrorAction;
