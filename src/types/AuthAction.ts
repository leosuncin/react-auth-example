import { AuthResp } from './AuthResp';

export interface LoginAction {
  type: 'login';
  payload: AuthResp;
}
export interface RegisterAction {
  type: 'register';
  payload: AuthResp;
}
export interface LogoutAction {
  type: 'logout';
}
export interface ErrorAction {
  type: 'error';
  payload: Error;
}

export type AuthAction =
  | LoginAction
  | RegisterAction
  | LogoutAction
  | ErrorAction;
