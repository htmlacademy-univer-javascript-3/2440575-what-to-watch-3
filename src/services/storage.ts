const AUTH_TOKEN_KEY_NAME = 'guess-melody-token';

export function getToken (): string {
  const token = localStorage.getItem(AUTH_TOKEN_KEY_NAME);
  return token ?? '';
}

export function saveToken (token: string) {
  localStorage.setItem(AUTH_TOKEN_KEY_NAME, token);
}

export function dropToken () {
  localStorage.removeItem(AUTH_TOKEN_KEY_NAME);
}
