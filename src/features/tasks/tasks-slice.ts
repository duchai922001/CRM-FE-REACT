import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { TasksService } from "../../services/tasks.service";
import { ICreateTask } from "../../types/tasks.interface";

export interface Task {
  id: number;
  name: string;
  status?: "todo" | "in_progress" | "done";
  description?: string;
  assignee: number;
}

interface TasksState {
  list: Task[];
  loading: boolean;
  error: string | null;
}

const initialState: TasksState = {
  list: [],
  loading: false,
  error: null,
};
export const fetchTasks = createAsyncThunk("tasks/fetch", async () => {
  const res = await TasksService.getAllTasks();
  return res as Task[];
});

export const fetchTasksUser = createAsyncThunk("tasks/fetchTaskUser", async () => {
  const res = await TasksService.findTasksByUser();
  return res as Task[];
});

export const updateTaskStatus = createAsyncThunk(
  "tasks/updateStatus",
  async ({ id, status }: { id: number; status: Task["status"] }) => {
    await TasksService.update(id, { status });
    return { id, status };
  }
);

export const updateTask = createAsyncThunk(
  "tasks/update",
  async ({ id, data }: { id: number; data: any }) => {
    await TasksService.update(id, data);
    return { id, data };
  }
);

export const addTask = createAsyncThunk(
  "tasks/addTask",
  async (newTask: ICreateTask, { rejectWithValue }) => {
    try {
      const res = await TasksService.create(newTask);
      return res as Task;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Không thể thêm công việc"
      );
    }
  }
);

export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (taskId: number) => {
    await TasksService.delete(taskId);
    return taskId;
  }
);

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    removeTaskById: (state, action: PayloadAction<number>) => {
      state.list = state.list.filter((task) => task.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action: PayloadAction<Task[]>) => {
        state.list = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchTasksUser.fulfilled, (state, action: PayloadAction<Task[]>) => {
        state.list = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(updateTaskStatus.fulfilled, (state, action) => {
        const task = state.list.find((t) => t.id === action.payload.id);
        if (task) task.status = action.payload.status;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const { id, data } = action.payload;
        const task = state.list.find((t) => t.id === id);
        if (task) {
          Object.assign(task, data);
        }
      })
      .addCase(addTask.fulfilled, (state, action: PayloadAction<Task>) => {
        state.list.push(action.payload);
      })
      .addCase(addTask.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(deleteTask.fulfilled, (state, action: PayloadAction<number>) => {
        state.list = state.list.filter(
          (task) => task.id !== Number(action.payload)
        );
        state.error = null;
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.error = action.error.message || "Xóa công việc thất bại";
      });
  },
});
export const { removeTaskById } = tasksSlice.actions;
export default tasksSlice.reducer;
