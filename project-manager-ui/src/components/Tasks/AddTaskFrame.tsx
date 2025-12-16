import React, { useRef, useState } from "react";

import "@neo4j-ndl/base/lib/neo4j-ds-styles.css";
import {
  DatePicker,
  Dialog,
  FilledButton,
  OutlinedButton,
} from "@neo4j-ndl/react";

import {
  formatDate,
  PRIORITY_OPTIONS,
  TaskOnCreate,
} from "../../helpers/helpers";

const AddTaskFrame = (props: {
  isOpen: boolean;
  onSubmit: (task: TaskOnCreate) => void;
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(props.isOpen);
  const [invalidInput, setInvalidInput] = useState<string>("");
  const ref = useRef<HTMLDivElement | null>(null);
  const [task, setNewTask] = useState({
    title: "NewTask",
    startDate: new Date(),
    endDate: new Date(),
    description: "",
    priority: PRIORITY_OPTIONS[0],
  });

  const cleanTask = () => {
    setNewTask({
      title: "NewTask",
      startDate: new Date(),
      endDate: new Date(),
      description: "",
      priority: PRIORITY_OPTIONS[0],
    });
    setInvalidInput("");
  };

  const handleClose = () => {
    cleanTask();
    setIsOpen(false);
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
    let res = checkInput();
    if (res === "") {
      props.onSubmit(task);
      cleanTask();
      setIsOpen(false);
    }
  };

  return (
    <div ref={ref}>
      <div>
        <FilledButton
          onClick={() => setIsOpen((prev) => !prev)}
          style={{ backgroundColor: "rgb(25, 47, 110)" }}
        >
          Add Task
        </FilledButton>
      </div>
      <Dialog
        onClose={handleClose}
        isOpen={isOpen}
        container={ref?.current || undefined}
      >
        <Dialog.Header style={{ color: "black" }}>
          Add New Task Info
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
          <FilledButton onClick={handleSubmit} size="medium">
            Add Task
          </FilledButton>
        </Dialog.Actions>
      </Dialog>
    </div>
  );
};

export default AddTaskFrame;
