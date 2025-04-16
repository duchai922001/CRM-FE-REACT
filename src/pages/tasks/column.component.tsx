import React, { useState } from "react";
import { useDrop } from "react-dnd";
import DraggableCard from "./card.component";
import { LuSquareMenu } from "react-icons/lu";
import { GoPlus } from "react-icons/go";
import { FaRegWindowClose } from "react-icons/fa";
import { toast } from "react-toastify";
import { TasksService } from "../../services/tasks.service";

type Props = {
  title: string;
  tasks: { id: string; text: string }[];
  onDrop: (task: any, toColumn: string) => void;
  columnKey: string;
};

const DropColumn = ({ title, tasks, onDrop, columnKey }: Props) => {
  const [showInput, setShowInput] = useState(false);
  const [newTaskText, setNewTaskText] = useState("");
  const [, dropRef] = useDrop({
    accept: "CARD",
    drop: (item: any) => {
      onDrop(item, columnKey);
    },
  });
  const handleAddTask = async () => {
    if (newTaskText.trim() === "") return;
    tasks.push({ id: Date.now().toString(), text: newTaskText });
    try {
      const payload = {
        name: newTaskText,
        assigneeId: 1,
      };
      await TasksService.create(payload);
      setNewTaskText("");
      setShowInput(false);
      toast.success("Thêm công việc thành công");
    } catch (error) {
      toast.error(error.message ?? "Lỗi hệ thống");
    }
  };
  return (
    <div ref={dropRef} className="column-container">
      <div className="header-column">
        <h3>{title}</h3>
        <LuSquareMenu className="action" />
      </div>
      <div className="tasks-column">
        {tasks.map((task) => (
          <DraggableCard key={task.id} id={task.id} text={task.text} />
        ))}
        {showInput && (
          <div style={{ marginTop: 8 }}>
            <input
              type="text"
              placeholder="Nhập tên công việc..."
              value={newTaskText}
              onChange={(e) => setNewTaskText(e.target.value)}
              className="task-input"
            />
          </div>
        )}
      </div>
      {showInput ? (
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button onClick={handleAddTask} className="btn-confirm">
            Thêm
          </button>
          <FaRegWindowClose
            className="action"
            onClick={() => setShowInput(false)}
          />
        </div>
      ) : (
        <button className="btn-task" onClick={() => setShowInput(true)}>
          {" "}
          <GoPlus />
          <span>Thêm công việc </span>
        </button>
      )}
    </div>
  );
};

export default DropColumn;
