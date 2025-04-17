import { localStorageUtil } from "../helpers/localstorage.helper";
import { ICreateTask, IUpdateTask } from "../types/tasks.interface";
import axiosInstance from "./main.service";

const user = localStorageUtil.get("user");
export const TasksService = {
  create: async (data: ICreateTask) => {
    const response = await axiosInstance.post("/tasks/create", data);
    return response.data;
  },
  getAllTasks: async () => {
    const response = await axiosInstance.get("/tasks/get-all");
    return response.data;
  },
  getTaskById: async (id: number) => {
    const response = await axiosInstance.get(`/tasks/${id}`);
    return response.data;
  },

  update: async (id: number, data: IUpdateTask) => {
    const response = await axiosInstance.put(`/tasks/${id}`, data);
    return response.data;
  },

  delete: async (id: number) => {
    const response = await axiosInstance.delete(`/tasks/${id}`);
    return response.data;
  },

  findTasksByUser: async () => {
    const response = await axiosInstance.get(
      `/tasks/get-task-user/${user.id}`
    );
    return response.data;
  },
};
