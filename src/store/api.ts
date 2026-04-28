import axios, {AxiosInstance, AxiosError} from 'axios';

const BASE_URL = 'https://15.design.htmlacademy.pro/six-cities';
const TIMEOUT = 5000;

export const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: TIMEOUT,
});

export enum APIRoute {
  Offers = '/offers',
  Favorites = '/favorite',
  Comments = '/comments',
  Login = '/login',
  Logout = '/logout',
}

const TOKEN_KEY = 'six-cities-token';

export function getToken(): string {
  const token = localStorage.getItem(TOKEN_KEY);
  return token ?? '';
}

export function saveToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token);
}

export function dropToken(): void {
  localStorage.removeItem(TOKEN_KEY);
}

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers['X-Token'] = token;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      dropToken();
    }
    throw error;
  }
);
