import React, { useState } from "react";
import { useDrag } from "react-dnd";
import ModalTask from "./modal-task.component";

const DraggableCard = ({ id, text }: { id: string; text: string }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [{ isDragging }, dragRef] = useDrag({
    type: "CARD",
    item: { id, text },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const showModal = () => {
    setIsOpen(true);
  };
  const handleCancel = () => {
    setIsOpen(false);
  };
  return (
    <>
      <div ref={dragRef} className="card-task" onClick={showModal}>
        {text}
      </div>
      <ModalTask
        title={text}
        isModalOpen={isOpen}
        handleCancel={handleCancel}
        handleOk={handleCancel}
      />
    </>
  );
};

export default DraggableCard;
