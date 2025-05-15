import { atom } from "recoil";
import { Task } from "../../types/task.interface";

export const tasksAtom = atom<Task[]>({
  key: "tasksAtom",
  default: [],
});

export const tasksLoadingAtom = atom<boolean>({
  key: "tasksLoadingAtom",
  default: false,
});

export const tasksErrorAtom = atom<string | null>({
  key: "tasksErrorAtom",
  default: null,
});

