import axios, { AxiosRequestHeaders } from "axios";
import { useAuthStore } from "../store/auth";
import jwt_decode from "jwt-decode";

export type Token = {
  exp: number;
  user_id: number;
}

const baseURL = import.meta.env.VITE_BACKEND_URL;

export const axi = axios.create({
  baseURL,
});

export const authAxios = axios.create({
  baseURL,
  withCredentials: false,
});

authAxios.interceptors.request.use(
  async (config) => {
    try {
      const token: string = useAuthStore.getState().access;
      if (token) {
        config.headers = {
          Authorization: `Bearer ${token}`,
        } as AxiosRequestHeaders;

        const tokenDecoded: Token = jwt_decode(token);
        const expiration = new Date(tokenDecoded.exp * 1000);
        const now = new Date();

        if (expiration.getTime() - now.getTime() < 0) {
          useAuthStore.getState().logout();
          throw new axios.Cancel("Token expired");
        }
      }
      return config;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);
