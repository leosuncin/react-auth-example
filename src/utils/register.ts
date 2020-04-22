import { AuthResp } from '../types/AuthResp';
import { BadRequest } from '../types/BadRequest';
import { Register } from '../types/Register';
import { User } from '../types/User';

export async function register(body: Register): Promise<AuthResp> {
  const resp = await fetch(`${process.env.REACT_APP_API_URL}/auth/register`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (resp.status === 400) {
    const error: BadRequest = await resp.json();

    throw new Error(error.message.join('\n'));
  }

  const [, token] = (resp.headers.get('authorization') ?? '').split(' ');
  const user: User = await resp.json();

  return { token, user };
}
