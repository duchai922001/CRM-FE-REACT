import React, { useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DropColumn from "./column.component";
import { TasksService } from "../../services/tasks.service";

type TaskResponse = {
  id: number;
  name: string;
  status: "todo" | "in_progress" | "done";
};

type TaskUI = { id: string; text: string };

type ColumnsType = {
  todo: TaskUI[];
  progress: TaskUI[];
  finished: TaskUI[];
};

export const TasksPage = () => {
  const [columns, setColumns] = useState<ColumnsType>({
    todo: [],
    progress: [],
    finished: [],
  });
  const moveTask = async (task: any, toColumn: string) => {
    setColumns((prev) => {
      const newCols = { ...prev };

      // Xóa task khỏi tất cả các cột
      Object.keys(newCols).forEach((key) => {
        newCols[key] = newCols[key].filter((t) => t.id !== task.id);
      });

      // Thêm task vào cột đích
      newCols[toColumn].push(task);

      return newCols;
    });
    try {
      await TasksService.update(task.id, {
        status:
          toColumn === "progress"
            ? "in_progress"
            : toColumn === "finished"
            ? "done"
            : toColumn,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const asyncDataTasks = async () => {
    try {
      const response = await TasksService.getAllTasks();
      const data: TaskResponse[] = response;
      const mapped: ColumnsType = {
        todo: data
          ?.filter((t) => t.status === "todo")
          .map((t) => ({ id: String(t.id), text: t.name })),
        progress: data
          ?.filter((t) => t.status === "in_progress")
          .map((t) => ({ id: String(t.id), text: t.name })),
        finished: data
          ?.filter((t) => t.status === "done")
          .map((t) => ({ id: String(t.id), text: t.name })),
      };

      setColumns(mapped);
    } catch (error) {
      console.log({ error });
    }
  };
  useEffect(() => {
    asyncDataTasks();
  }, []);
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
