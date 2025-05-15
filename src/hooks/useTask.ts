import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { TASKS_QUERY_KEY } from "../constants/queryTasks";
import { TasksService } from "../services/tasks.service";
import { USERS_QUERY_KEY } from "../constants/queryKeys";

export const useTasks = () =>
  useQuery({
    queryKey: TASKS_QUERY_KEY,
    queryFn: () => TasksService.getAllTasks(),
    select: (res) => res,
    staleTime: 10000,
  });

export const useCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: TasksService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TASKS_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: USERS_QUERY_KEY });

    },
  });
};
