import type { AuthResp } from '../types/AuthResp';
import type { Login } from '../types/Login';
import type { RequestError } from '../types/RequestError';
import type { User } from '../types/User';

export async function login(body: Login): Promise<AuthResp> {
  const resp = await fetch(`${process.env.REACT_APP_API_URL}/auth/login`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (resp.status >= 400) {
    const error: RequestError = await resp.json();

    throw new Error(
      Array.isArray(error.message) ? error.message.join('\n') : error.message,
    );
  }

  const [, token] = (resp.headers.get('authorization') ?? '').split(' ');
  const user: User = await resp.json();

  return { token, user };
}
