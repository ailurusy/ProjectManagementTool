import React, { useRef, useState } from "react";

import { Dialog, FilledButton, OutlinedButton } from "@neo4j-ndl/react";
import { TrashIconOutline } from "@neo4j-ndl/react/icons";

const DeleteTaskView = (props: {
  isOpen: boolean;
  onSubmit: (id: string) => void;
  taskId: string;
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(props.isOpen);
  const handleClick = () => setIsOpen((prev) => !prev);
  const handleClose = () => setIsOpen(false);

  const handleDeleteTask = async () => {
    props.onSubmit(props.taskId);
    handleClose();
  };

  return (
    <div ref={ref}>
      <div className="outlined-button">
        <OutlinedButton onClick={handleClick}>
          <TrashIconOutline />
        </OutlinedButton>
      </div>
      <Dialog
        onClose={handleClose}
        isOpen={isOpen}
        container={ref?.current || undefined}
      >
        <Dialog.Header style={{ color: "black" }}>
          Delete This Task?
        </Dialog.Header>
        <>
          <Dialog.Content style={{ color: "black" }}>
            This action will delete the task forever. Are you sure you want to
            delete it?
          </Dialog.Content>
        </>
        <Dialog.Actions>
          <OutlinedButton onClick={handleClose} variant="neutral" size="medium">
            Cancel
          </OutlinedButton>
          <FilledButton
            onClick={handleDeleteTask}
            size="medium"
            style={{ background: "red" }}
          >
            Delete
          </FilledButton>
        </Dialog.Actions>
      </Dialog>
    </div>
  );
};

export default DeleteTaskView;
