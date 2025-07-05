import Cookies from 'js-cookie';

const TOKEN_NAME = "AUTH_TOKEN";

export const setAuthCookie = (token: string): void => {
  Cookies.set(TOKEN_NAME, token);
};

export const getAuthToken = (): string | undefined => {
  return Cookies.get(TOKEN_NAME);
};

export const checkAuthToken = (): boolean => {
  return !!getAuthToken();
};

export const removeAuthToken = (): void => {
  Cookies.remove(TOKEN_NAME, {
    path: "/",
  });
};

export function getGoogleAuthToken(): string | undefined {
  return Cookies.get("authjs.session-token");
}

