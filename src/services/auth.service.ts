import { ILogin, IRegister } from "../types/auth.interface";
import axiosInstance from "./main.service";

export const AuthService = {
  register: async (data: IRegister) => {
    const response = await axiosInstance.post("/auth/register", data);
    return response.data;
  },
  login: async (data: ILogin) => {
    const response = await axiosInstance.post("/auth/login", data);
    return response.data;
  },
};
