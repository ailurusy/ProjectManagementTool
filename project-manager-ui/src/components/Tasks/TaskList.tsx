import React, { useEffect, useState } from "react";

import axios from "axios";

import { useParams } from "react-router-dom";
import AddTaskFrame from "./AddTaskFrame";
import TaskRow from "./TaskRow";
import EditTaskFrame from "./EditTaskFrame";
import DeleteTaskView from "./DeleteTaskView";
import {
  payloadTask,
  Task,
  TASK_TABLE_HEADERS,
  TaskOnCreate,
} from "../../helpers/helpers";

const TaskList = () => {
  const { id } = useParams();
  const [data, setData] = useState({
    name: "",
    description: "",
    startDate: "",
    createdAt: "",
    endDate: "",
    priority: "",
    tasks: [],
  });

  const [loading, setLoading] = useState(true);

  const getTasks = async () => {
    console.log("Getting tasks");
    setLoading(true);
    const res = await axios.get(`http://localhost:8080/api/projects/${id}`);
    setData(await res.data);
    setLoading(false);
  };

  const addTask = async (newTask: TaskOnCreate) => {
    console.log("Adding a task");
    await axios.post(`http://localhost:8080/api/projects/${id}/tasks`, newTask);
    getTasks();
  };

  const deleteTask = async (task_id: string) => {
    console.log("Delete task. Task ID: ", task_id);
    await axios.delete(
      `http://localhost:8080/api/projects/${id}/tasks/${task_id}`,
    );
    getTasks();
  };

  const updateTask = async (payload: payloadTask, taskId: string) => {
    console.log("Updating a task");
    await axios.patch(
      `http://localhost:8080/api/projects/${id}/tasks/${taskId}`,
      payload,
    ); //ADD real task id
    getTasks();
  };

  useEffect(() => {
    getTasks();
  }, []);

  const tasks = data["tasks"] ?? [];

  if (loading) return <p>Loading...</p>;
  if (data === null || data === undefined) return <p>Loading...</p>;

  return (
    <div className="page-container">
      <header>
        <h1>{data && data["name"]}</h1>
        <p>Here you can find all the information about the chosen project</p>
      </header>
      <div className="content-container">
        <div className="date-container">
          <div>
            <h4>CreatedAt Date</h4>
            <p>{data && data["createdAt"]}</p>
          </div>
          <div>
            <h4>Start Date</h4>
            <p>{data && data["startDate"]}</p>
          </div>
          <div>
            <h4>End Date</h4>
            <p>{data && data["endDate"]}</p>
          </div>
        </div>
        <div>
          <h4>Priority</h4>
          <p>{data && data["priority"]}</p>
        </div>
        <div>
          <h4>Description</h4>
          <p>{data && data["description"]}</p>
        </div>
      </div>
      <div className="content-container">
        <h2>Tasks in the Project</h2>
        <div className="add-button">
          <AddTaskFrame isOpen={false} onSubmit={addTask} />
        </div>
        <div>
          <table className="manager-tracker-table">
            <thead>
              <tr>
                {TASK_TABLE_HEADERS.map((header) => (
                  <th>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {!tasks || tasks.length === 0 ? (
                <tr>
                  <td
                    colSpan={TASK_TABLE_HEADERS.length}
                    style={{ textAlign: "center" }}
                  >
                    No tasks in the project
                  </td>
                </tr>
              ) : (
                tasks.map((task: Task, index: number) => {
                  return (
                    <>
                      <TaskRow task={task} index={index} key={task.id} />
                      <td colSpan={TASK_TABLE_HEADERS.length}>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "right",
                          }}
                        >
                          <EditTaskFrame
                            isOpen={false}
                            task={task}
                            key={task.id}
                            onSubmit={updateTask}
                          />
                          <DeleteTaskView
                            isOpen={false}
                            onSubmit={deleteTask}
                            taskId={task.id}
                          />
                        </div>
                      </td>
                    </>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TaskList;
