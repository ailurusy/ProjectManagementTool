import React from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import ProjectList from "./components/Projects/ProjectList";
import TaskList from "./components/Tasks/TaskList";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProjectList />} />
        <Route path="/projects/:id/tasks" element={<TaskList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
