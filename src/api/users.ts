import { axi } from "./useAxios";

export const login = async (username: string, password: string) => {
  const response = await axi.post("/login", { username, password });
  return response.data;
}
