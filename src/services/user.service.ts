import axiosInstance from "./main.service";

export const UserService = {
  getAll: async (search: string) => {
    const response = await axiosInstance.get("/users/get-all", {params: {search}});
    return response.data;
  },
  updateUser: async (data: any, id: number) => {
    const response = await axiosInstance.put(`/users/${id}`, data);
    return response.data;
  },
  deleteUser: async (id: number) => {
    const response = await axiosInstance.delete(`/users/${id}`);
    return response.data;
  },
};
