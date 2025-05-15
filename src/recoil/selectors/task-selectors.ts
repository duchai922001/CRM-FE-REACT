import { selector } from "recoil";
import {
  tasksAtom,
  tasksErrorAtom,
  tasksLoadingAtom,
} from "../atoms/tasks-atom";
import { TasksService } from "../../services/tasks.service";

export const fetchTasksSelector = selector({
  key: "fetchTasksSelector",
  get: async ({ set, reset }) => {
    set(tasksLoadingAtom, true);
    try {
      const tasks = await TasksService.getAllTasks();
      set(tasksAtom, tasks);
      set(tasksLoadingAtom, false);
    } catch {
      set(tasksErrorAtom, "Không thể tải danh sách công việc");
      set(tasksLoadingAtom, false);
    }
  },
});

export const fetchTasksByUserSelector = selector({
  key: "fetchTasksByUserSelector",
  get: async ({ set, reset }) => {
    set(tasksLoadingAtom, true);
    try {
      const tasks = await TasksService.findTasksByUser();
      set(tasksAtom, tasks);
      set(tasksLoadingAtom, false);
    } catch {
      set(tasksErrorAtom, "Không thể tải công việc cho người dùng");
      set(tasksLoadingAtom, false);
    }
  },
});
