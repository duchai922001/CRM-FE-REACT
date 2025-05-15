import { Route, Routes } from "react-router-dom";
import MainLayout from "../layouts/main.layout";
import HomePage from "../pages/home.page";
import Register from "../pages/register.page";
import Login from "../pages/login.page";
import PrivateRoute from "./private.router";
import { TasksPage } from "../pages/tasks/tasks.page";
import Users from "../pages/users.page";

const MainRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route element={<PrivateRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/tasks" element={<TasksPage />} />
            <Route path="/users" element={<Users />} />

          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default MainRouter;
