import axiosInstance from "./main.service";

export const UserService = {
  getAll: async () => {
    const response = await axiosInstance.get("/users/get-all");
    return response.data;
  },
};
