import React, { useRef, useState } from "react";

import "@neo4j-ndl/base/lib/neo4j-ds-styles.css";
import { Dialog, OutlinedButton } from "@neo4j-ndl/react";
import { InformationCircleIconOutline } from "@neo4j-ndl/react/icons";

import { parseDate, Task } from "../../helpers/helpers";

const TaskInfoFrame = (props: { isOpen: boolean; task: Task; key: string }) => {
  let task = props.task;

  const [isOpen, setIsOpen] = useState<boolean>(props.isOpen);
  const handleClick = () => setIsOpen((prev) => !prev);
  const handleClose = () => setIsOpen(false);

  const ref = useRef<HTMLDivElement | null>(null);

  return (
    <div ref={ref}>
      <div>
        <OutlinedButton onClick={handleClick} style={{ margin: "5px" }}>
          <InformationCircleIconOutline />
        </OutlinedButton>
      </div>
      <Dialog
        onClose={handleClose}
        isOpen={isOpen}
        container={ref?.current || undefined}
      >
        <>
          <Dialog.Content style={{ color: "black" }}>
            <div>
              <header>
                <h1>{task["title"]}</h1>
                <p>Here you can find all the information about your task</p>
              </header>
              <div className="content-container">
                <div className="date-container">
                  <div>
                    <h4>CreatedAt Date</h4>
                    <p>{parseDate(task["createdAt"])}</p>
                  </div>
                  <div>
                    <h4>Start Date</h4>
                    <p>{parseDate(task["startDate"])}</p>
                  </div>
                  <div>
                    <h4>End Date</h4>
                    <p>{parseDate(task["endDate"])}</p>
                  </div>
                </div>
                <div>
                  <h4>Priority</h4>
                  <p>{task["priority"]}</p>
                </div>
                <div>
                  <h4>Description</h4>
                  <p>{task["description"]}</p>
                </div>
              </div>
            </div>
          </Dialog.Content>
        </>
        <Dialog.Actions>
          <OutlinedButton onClick={handleClose} variant="neutral" size="medium">
            Cancel
          </OutlinedButton>
        </Dialog.Actions>
      </Dialog>
    </div>
  );
};

export default TaskInfoFrame;
