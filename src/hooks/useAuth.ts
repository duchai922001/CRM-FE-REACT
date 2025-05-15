import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { ILogin, IRegister } from "../types/auth.interface";
import { AuthService } from "../services/auth.service";
import { localStorageUtil } from "../helpers/localstorage.helper";
import { toast } from "react-toastify";

export const useLogin = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: ILogin) => AuthService.login(data),
    onSuccess: (response) => {
      localStorageUtil.set("user", response.user);
      localStorageUtil.set("accessToken", response.access_token);
      toast.success("Đăng nhập thành công");
      navigate("/");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Lỗi hệ thống");
    },
  });
};

export const useRegister = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: IRegister) => AuthService.register(data),
    onSuccess: () => {
      toast.success("Đăng ký thành công");
      navigate("/login");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Lỗi hệ thống");
    },
  });
};
