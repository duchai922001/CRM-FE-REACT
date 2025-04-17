import { useEffect, useMemo } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DropColumn from "./column.component";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { useSelector } from "react-redux";
import {
  fetchTasks,
  fetchTasksUser,
  Task,
  updateTaskStatus,
} from "../../features/tasks/tasks-slice";
import { localStorageUtil } from "../../helpers/localstorage.helper";
type TaskUI = { id: string; text: string };

export const TasksPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const tasks = useSelector((state: RootState) => state.tasks.list);
  const user = localStorageUtil.get("user");
  const columns = useMemo(() => {
    const mapTasks = (status: Task["status"]): TaskUI[] =>
      tasks
        .filter((t) => t.status === status)
        .map((t) => ({ id: String(t.id), text: t.name }));

    return {
      todo: mapTasks("todo"),
      progress: mapTasks("in_progress"),
      finished: mapTasks("done"),
    };
  }, [tasks]);

  const moveTask = async (task: TaskUI, toColumn: string) => {
    const status =
      toColumn === "progress"
        ? "in_progress"
        : toColumn === "finished"
        ? "done"
        : "todo";

    dispatch(updateTaskStatus({ id: Number(task.id), status }));
  };
  useEffect(() => {
    if (user.role === "Leader") {
      dispatch(fetchTasks());
    } else {
      dispatch(fetchTasksUser());
    }
  }, [dispatch]);
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="tasks-container">
        <DropColumn
          title="To Do"
          tasks={columns.todo}
          onDrop={moveTask}
          columnKey="todo"
        />
        <DropColumn
          title="In Progress"
          tasks={columns.progress}
          onDrop={moveTask}
          columnKey="progress"
        />
        <DropColumn
          title="Finished"
          tasks={columns.finished}
          onDrop={moveTask}
          columnKey="finished"
        />
      </div>
    </DndProvider>
  );
};
