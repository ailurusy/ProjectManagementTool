import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Checkbox } from "@neo4j-ndl/react";
import TaskInfoFrame from "./TaskInfo";
import { parseDate, Task } from "../../helpers/helpers";
import axios from "axios";

const TaskRow = (props: { task: Task; index: number; key: string }) => {
  const { id } = useParams();
  const task = props.task;
  const [checked, setChecked] = useState(() => task["completed"] ?? false);

  const handleTaskCrossed = async (
    payload: Partial<{
      completed: boolean;
    }>,
  ) => {
    console.log(payload);
    await axios.patch(
      `http://localhost:8080/api/projects/${id}/tasks/${task.id}`,
      payload,
    );
    setChecked((prev: boolean) => !prev);
    console.log("Task Completed should be updated");
  };

  return (
    <tr>
      <td className={checked ? "task-checked" : ""}>{props.index + 1}</td>
      <td className={checked ? "task-checked" : ""}>{task["title"]}</td>
      <td className={checked ? "task-checked" : ""}>
        {parseDate(task["startDate"])}
      </td>
      <td className={checked ? "task-checked" : ""}>
        {parseDate(task["endDate"])}
      </td>
      <td className={checked ? "task-checked" : ""}>
        {parseDate(task["createdAt"])}
      </td>
      <td>{checked ? "Done" : "In Progress"}</td>
      <td>
        <Checkbox
          ariaLabel="no-label-provided"
          isChecked={checked}
          onClick={() => handleTaskCrossed({ completed: !checked })}
        />
      </td>
      <td>
        <TaskInfoFrame isOpen={false} task={task} key={task["id"]} />
      </td>
    </tr>
  );
};

export default TaskRow;
