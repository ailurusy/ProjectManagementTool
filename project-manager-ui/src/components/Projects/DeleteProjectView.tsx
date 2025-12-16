import React, { useRef, useState } from "react";

import "@neo4j-ndl/base/lib/neo4j-ds-styles.css";

import { Dialog, FilledButton, OutlinedButton } from "@neo4j-ndl/react";
import { TrashIconOutline } from "@neo4j-ndl/react/icons";

const DeleteProjectView = (props: {
  isOpen: boolean;
  onSubmit: (id: string) => void;
  projectId: string;
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(props.isOpen);

  const handleClick = () => setIsOpen((prev) => !prev);
  const handleClose = () => setIsOpen(false);

  const handleDelete = async () => {
    props.onSubmit(props.projectId);
    setIsOpen(false);
  };

  const ref = useRef<HTMLDivElement | null>(null);
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
          Delete This Project?
        </Dialog.Header>
        <>
          <Dialog.Content style={{ color: "black" }}>
            This action will also delete all the tasks within the project. Are
            you sure you want to delete this project?
          </Dialog.Content>
        </>
        <Dialog.Actions>
          <OutlinedButton onClick={handleClose} variant="neutral" size="medium">
            Cancel
          </OutlinedButton>
          <FilledButton
            onClick={handleDelete}
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

export default DeleteProjectView;
