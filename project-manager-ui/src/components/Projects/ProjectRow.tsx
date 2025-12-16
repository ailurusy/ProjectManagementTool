import React, { useMemo } from "react";

import { Link } from "react-router-dom";
import { parseDate, Project, Task } from "../../helpers/helpers";

const ProjectRow = (props: {
  project: Project;
  index: number;
  key: string;
}) => {
  const project = props.project;

  const parseTasksDone = (tasks: Array<Task>) => {
    let count = 0;
    if (tasks && tasks.length > 0)
      for (let task of tasks) if (task["completed"]) count++;
    return count;
  };

  const { total, completed } = useMemo(() => {
    const total = project["tasks"]?.length ?? 0;
    const completed = parseTasksDone(project["tasks"]);
    return { total, completed };
  }, [project]);

  return (
    <tr>
      <td>{props.index + 1}</td>
      <td>
        <Link to={`/projects/${project.id}/tasks`}>{project["name"]}</Link>
      </td>
      <td>{project["priority"]}</td>
      <td>{parseDate(project["startDate"])}</td>
      <td>{parseDate(project["endDate"])}</td>
      <td>{parseDate(project["createdAt"])}</td>
      <td>{completed}</td>
      <td>{total}</td>
      <td>
        <div className="project-progress-bar">
          <progress value={total ? completed / total : 0}></progress>
        </div>
      </td>
    </tr>
  );
};

export default ProjectRow;
