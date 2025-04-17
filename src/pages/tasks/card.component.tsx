import React, { useState } from "react";
import { useDrag } from "react-dnd";
import ModalTask from "./modal-task.component";

const DraggableCard = ({
  id,
  text,
  columnKey,
}: {
  id: number;
  text: string;
  columnKey: string;
}) => {
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
  const handleClose = () => {
    setIsOpen(false);
  };
  return (
    <>
      <div ref={dragRef} className="card-task" onClick={showModal}>
        {text}
      </div>
      <ModalTask
        columnKey={columnKey}
        id={id}
        title={text}
        isModalOpen={isOpen}
        handleClose={handleClose}
      />
    </>
  );
};

export default DraggableCard;
