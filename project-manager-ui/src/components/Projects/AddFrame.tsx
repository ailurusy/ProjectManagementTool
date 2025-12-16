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
  ProjectOnCreate,
} from "../../helpers/helpers";

const AddFrame = (props: {
  isOpen: boolean;
  onSubmit: (project: ProjectOnCreate) => void;
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(props.isOpen);
  const [invalidInput, setInvalidInput] = useState<string>("");
  const ref = useRef<HTMLDivElement | null>(null);
  const [project, setNewProject] = useState({
    name: "NewProject",
    description: "",
    startDate: new Date(),
    endDate: new Date(),
    priority: PRIORITY_OPTIONS[0],
  });

  const cleanForm = () => {
    setNewProject({
      name: "NewProject",
      description: "",
      startDate: new Date(),
      endDate: new Date(),
      priority: PRIORITY_OPTIONS[0],
    });
    setInvalidInput("");
  };

  const handleClose = () => {
    cleanForm();
    setIsOpen(false);
  };

  const handleChange = (key: string, value: string | (Date | null)) => {
    setNewProject((prev) => ({ ...prev, [key]: value }));
  };

  const checkInput = () => {
    let messages = [];
    let startDate = formatDate(project.startDate);
    let endDate = formatDate(project.endDate);
    if (!project.name) messages.push("Project name is empty");
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
      props.onSubmit(project);
      cleanForm();
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
          Add Project
        </FilledButton>
      </div>
      <Dialog
        onClose={handleClose}
        isOpen={isOpen}
        container={ref?.current || undefined}
      >
        <Dialog.Header style={{ color: "black" }}>
          Add New Project Info
        </Dialog.Header>
        <Dialog.Content>
          <h4>{invalidInput}</h4>
          <div>
            <label>
              Project Name
              <span className="req">*</span>
            </label>
            <input
              className="input-form"
              style={
                project.name === ""
                  ? { borderColor: "red" }
                  : { borderColor: "#ccc" }
              }
              required
              value={project.name}
              onChange={(e) => handleChange("name", e.target.value)}
            />
          </div>
          <div
            className="date-picker-container"
            style={
              formatDate(project.startDate) > formatDate(project.endDate)
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
                selected: project.startDate,
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
                selected: project.endDate,
              }}
            />
          </div>
          <div>
            <label>Priority: </label>
            <select
              value={project.priority}
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
              value={project.description}
              onChange={(e) => handleChange("description", e.target.value)}
            />
          </div>
        </Dialog.Content>
        <Dialog.Actions>
          <OutlinedButton onClick={handleClose} variant="neutral" size="medium">
            Cancel
          </OutlinedButton>
          <FilledButton type="submit" onClick={handleSubmit} size="medium">
            Add Project
          </FilledButton>
        </Dialog.Actions>
      </Dialog>
    </div>
  );
};

export default AddFrame;
