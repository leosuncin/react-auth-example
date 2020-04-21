import { Register } from '../types/Register';
import { RequestError } from '../types/RequestError';
import { User } from '../types/User';

export async function register(body: Register): Promise<User> {
  const resp = await fetch(`${process.env.REACT_APP_API_URL}/auth/register`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (resp.status === 400) {
    const error: RequestError = await resp.json();

    throw new Error(error.message.join('\n'));
  }

  return resp.json();
}
