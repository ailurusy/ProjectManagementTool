import React, {useRef, useState} from "react";
import "@neo4j-ndl/base/lib/neo4j-ds-styles.css";

import {DatePicker, Dialog, FilledButton, OutlinedButton,} from "@neo4j-ndl/react";
import {PencilIconOutline} from "@neo4j-ndl/react/icons";
import {formatDate, payloadProject, PRIORITY_OPTIONS, Project,} from "../../helpers/helpers";

const EditFrame = (props: {
  isOpen: boolean;
  key: string;
  onSubmit: (payload: payloadProject, id: string) => void;
  project: Project;
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(props.isOpen);
  const [invalidInput, setInvalidInput] = useState<string>("");
  const ref = useRef<HTMLDivElement | null>(null);

  const [project, setNewProject] = useState({
    name: props.project.name,
    description: props.project.description,
    startDate: new Date(props.project.startDate),
    endDate: new Date(props.project.endDate),
    priority: props.project.priority,
  });

  const defaultProject = {
    name: props.project.name,
    description: props.project.description,
    startDate: new Date(props.project.startDate),
    endDate: new Date(props.project.endDate),
    priority: props.project.priority,
  };

  const cleanForm = () => {
    setNewProject({
      name: props.project.name,
      description: props.project.description,
      startDate: new Date(props.project.startDate),
      endDate: new Date(props.project.endDate),
      priority: props.project.priority,
    });
    setInvalidInput("");
  };

  const getPayload = () => {
    let payload: payloadProject = {};
    if (project.name !== defaultProject.name) payload["name"] = project.name;
    if (project.description !== defaultProject.description)
      payload["description"] = project.description;
    if (formatDate(project.startDate) !== formatDate(defaultProject.startDate))
      payload["startDate"] = project.startDate;
    if (formatDate(project.endDate) !== formatDate(defaultProject.endDate))
      payload["endDate"] = project.endDate;
    if (project.priority !== defaultProject.priority)
      payload["priority"] = project.priority;
    return payload;
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
      let payload: payloadProject = getPayload();
      if (JSON.stringify(payload) !== "{}") {
        console.log("Should send the payload");
        console.log(payload);
        if (props.onSubmit && props.project.id) {
          props.onSubmit(payload, props.project.id);
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
          Edit your project here
        </Dialog.Header>
        <Dialog.Content>
          <h4 style={invalidInput ? { color: "red" } : {}}>{invalidInput}</h4>
          <div>
            <label>
              Project Name
              <span className="req">*</span>
            </label>
            <input
              className="input-form"
              required
              value={project.name}
              style={
                project.name === ""
                  ? { borderColor: "red" }
                  : { borderColor: "#ccc" }
              }
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
            Edit Project
          </FilledButton>
        </Dialog.Actions>
      </Dialog>
    </div>
  );
};

export default EditFrame;
