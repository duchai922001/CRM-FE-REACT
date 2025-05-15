import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { UserService } from "../services/user.service";
import { USERS_QUERY_KEY } from "../constants/queryKeys";
import { AuthService } from "../services/auth.service";
import { toast } from "react-toastify";

export const useUsers = (search: string) =>
  useQuery({
    queryKey: [...USERS_QUERY_KEY, search],
    queryFn: () => UserService.getAll(search),
    select: (res) => res,
    staleTime: 10000,
    placeholderData: keepPreviousData
  });

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: AuthService.register,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USERS_QUERY_KEY });
    },
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: any }) =>
      UserService.updateUser(data, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USERS_QUERY_KEY });
    },
    onError: () => {
      toast.error("Cap nhat khong thanh cong")
    }
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => UserService.deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USERS_QUERY_KEY });
    },
  });
};
