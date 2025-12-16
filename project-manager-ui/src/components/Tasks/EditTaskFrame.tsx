import React, { useRef, useState } from "react";
import "@neo4j-ndl/base/lib/neo4j-ds-styles.css";

import {
  DatePicker,
  Dialog,
  FilledButton,
  OutlinedButton,
} from "@neo4j-ndl/react";
import { PencilIconOutline } from "@neo4j-ndl/react/icons";
import {
  formatDate,
  payloadTask,
  PRIORITY_OPTIONS,
  Task,
} from "../../helpers/helpers";

const EditTaskFrame = (props: {
  isOpen: boolean;
  key: string;
  onSubmit: (payload: payloadTask, id: string) => void;
  task: Task;
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(props.isOpen);
  const [invalidInput, setInvalidInput] = useState<string>("");
  const ref = useRef<HTMLDivElement | null>(null);

  const [task, setNewTask] = useState({
    title: props.task.title,
    description: props.task.description,
    startDate: new Date(props.task.startDate),
    endDate: new Date(props.task.endDate),
    priority: props.task.priority,
  });

  const defaultTask = {
    name: props.task.title,
    description: props.task.description,
    startDate: new Date(props.task.startDate),
    endDate: new Date(props.task.endDate),
    priority: props.task.priority,
  };

  const cleanForm = () => {
    setNewTask({
      title: props.task.title,
      description: props.task.description,
      startDate: new Date(props.task.startDate),
      endDate: new Date(props.task.endDate),
      priority: props.task.priority,
    });
    setInvalidInput("");
  };

  const handleClose = () => {
    cleanForm();
    setIsOpen(false);
  };

  const getTaskPayload = () => {
    let payload: payloadTask = {};
    if (task.title !== defaultTask.name) payload["title"] = task.title;
    if (task.description !== defaultTask.description)
      payload["description"] = task.description;
    if (formatDate(task.startDate) !== formatDate(defaultTask.startDate))
      payload["startDate"] = task.startDate;
    if (formatDate(task.endDate) !== formatDate(defaultTask.endDate))
      payload["endDate"] = task.endDate;
    if (task.priority !== defaultTask.priority)
      payload["priority"] = task.priority;
    return payload;
  };

  const handleChange = (key: string, value: string | (Date | null)) => {
    setNewTask((prev) => ({ ...prev, [key]: value }));
  };

  const checkInput = () => {
    let messages = [];
    let startDate = formatDate(task.startDate);
    let endDate = formatDate(task.endDate);
    if (!task.title) messages.push("Task name is empty");
    if (startDate > endDate) {
      messages.push(" Start Date cannot be later than End Date");
    }
    setInvalidInput(
      messages.length ? `Invalid input: ${messages.join(", ")}` : "",
    );
    return messages.length ? `Invalid input: ${messages.join(", ")}` : "";
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log(task);
    let res = checkInput();
    if (res === "") {
      let payload: payloadTask = getTaskPayload();
      if (JSON.stringify(payload) !== "{}") {
        console.log("Sending task payload");
        console.log(payload);
        if (props.onSubmit && props.task.id) {
          props.onSubmit(payload, props.task.id);
        }
        cleanForm();
        setIsOpen(false);
      } else setInvalidInput("No new changes to save");
    }
  };
  return (
    <div ref={ref}>
      <div className="outlined-button">
        <OutlinedButton onClick={() => setIsOpen((prev) => !prev)}>
          <PencilIconOutline />
        </OutlinedButton>
      </div>
      <Dialog
        onClose={handleClose}
        isOpen={isOpen}
        container={ref?.current || undefined}
      >
        <Dialog.Header style={{ color: "black" }}>
          Edit your task here
        </Dialog.Header>
        <Dialog.Content>
          <h4>{invalidInput}</h4>
          <div>
            <label>
              Task Name
              <span className="req">*</span>
            </label>
            <input
              className="input-form"
              style={
                task.title === ""
                  ? { borderColor: "red" }
                  : { borderColor: "#ccc" }
              }
              required
              value={task.title}
              onChange={(e) => handleChange("title", e.target.value)}
            />
          </div>
          <div
            className="date-picker-container"
            style={
              formatDate(task.startDate) > formatDate(task.endDate)
                ? { border: "1px solid red" }
                : {}
            }
          >
            <DatePicker
              className="date-picker"
              textInputProps={{ label: "Start date" }}
              reactDatePickerProps={{
                onChange: (date) => handleChange("startDate", date),
                popperProps: {
                  strategy: "fixed",
                },
                selected: task.startDate,
              }}
            />
            <DatePicker
              className="date-picker"
              textInputProps={{ label: "End date" }}
              reactDatePickerProps={{
                onChange: (date) => handleChange("endDate", date),
                popperProps: {
                  strategy: "fixed",
                },
                selected: task.endDate,
              }}
            />
          </div>
          <div>
            <label>Priority: </label>
            <select
              value={task.priority}
              onChange={(e) => handleChange("priority", e.target.value)}
            >
              {PRIORITY_OPTIONS.map((option) => (
                <option value={option}>{option}</option>
              ))}
            </select>
          </div>
          <div>
            <label>Description</label>
            <input
              className="input-form"
              value={task.description}
              onChange={(e) => handleChange("description", e.target.value)}
            />
          </div>
        </Dialog.Content>
        <Dialog.Actions>
          <OutlinedButton onClick={handleClose} variant="neutral" size="medium">
            Cancel
          </OutlinedButton>
          <FilledButton type="submit" onClick={handleSubmit} size="medium">
            Edit Task
          </FilledButton>
        </Dialog.Actions>
      </Dialog>
    </div>
  );
};

export default EditTaskFrame;
