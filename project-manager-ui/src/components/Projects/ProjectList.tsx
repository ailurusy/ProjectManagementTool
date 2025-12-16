import React, { useEffect, useState } from "react";

import axios from "axios";

import "@neo4j-ndl/base/lib/neo4j-ds-styles.css";
import "../styles.css";
import AddFrame from "./AddFrame";
import ProjectRow from "./ProjectRow";
import EditFrame from "./EditFrame";
import DeleteProjectView from "./DeleteProjectView";
import {
  payloadProject,
  Project,
  PROJECT_TABLE_HEADERS,
  ProjectOnCreate,
} from "../../helpers/helpers";

function ProjectList() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const getProjects = async () => {
    console.log("Get projects");
    setLoading(true);
    const res = await axios.get(`http://localhost:8080/api/projects`);
    setProjects(res.data);
    setLoading(false);
  };

  const addProject = async (newProject: ProjectOnCreate) => {
    console.log("Adding a project");
    await axios.post(`http://localhost:8080/api/projects`, newProject);
    await getProjects();
  };

  const updateProject = async (payload: payloadProject, projectId: string) => {
    console.log("Updating a project");
    await axios.patch(
      `http://localhost:8080/api/projects/${projectId}`,
      payload,
    );
    getProjects();
  };

  const deleteProject = async (id: string) => {
    console.log("Deleting a project");
    await axios.delete(`http://localhost:8080/api/projects/${id}`);
    getProjects();
  };

  useEffect(() => {
    getProjects();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="page-container">
      <header>
        <h1>Project and Task Manager</h1>
        <p>Welcome, to a demo project manager tool!</p>
      </header>
      <div className="content-container">
        <h2>Projects</h2>
        <div className="add-button">
          <AddFrame isOpen={false} onSubmit={addProject} />
        </div>
        <div>
          <table className="manager-tracker-table">
            <thead>
              <tr>
                {PROJECT_TABLE_HEADERS.map((header) => {
                  return <th>{header}</th>;
                })}
              </tr>
            </thead>
            <tbody>
              {!projects || projects.length === 0 ? (
                <tr>
                  <td
                    colSpan={PROJECT_TABLE_HEADERS.length}
                    style={{ textAlign: "center" }}
                  >
                    No projects found
                  </td>
                </tr>
              ) : (
                projects.map((project: Project, index: number) => {
                  return (
                    <>
                      <ProjectRow
                        project={project}
                        index={index}
                        key={project.id}
                      />
                      <td colSpan={PROJECT_TABLE_HEADERS.length}>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "right",
                          }}
                        >
                          <EditFrame
                            isOpen={false}
                            project={project}
                            key={project.id}
                            onSubmit={updateProject}
                          />
                          <DeleteProjectView
                            isOpen={false}
                            onSubmit={deleteProject}
                            projectId={project.id}
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
}

export default ProjectList;
