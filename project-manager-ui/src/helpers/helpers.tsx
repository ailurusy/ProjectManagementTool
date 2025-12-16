export type Project = {
  id: string;
  name: string;
  description?: string;
  createdAt: Date;
  startDate: Date;
  endDate: Date;
  priority: string;
  tasks: Array<Task>;
};

export type ProjectOnCreate = {
  name: string;
  description?: string;
  startDate: Date;
  endDate: Date;
  priority: string;
};

export type TaskOnCreate = {
  title: string;
  description?: string;
  startDate: Date;
  endDate: Date;
  priority: string;
};

export type Task = {
  id: string;
  title: string;
  description?: string;
  createdAt?: Date;
  startDate: Date;
  endDate: Date;
  priority: string;
  completed: boolean;
};

export type payloadProject = {
  name?: string;
  description?: string;
  startDate?: Date;
  endDate?: Date;
  priority?: string;
};

export type payloadTask = {
  title?: string;
  description?: string;
  startDate?: Date;
  endDate?: Date;
  priority?: string;
  completed?: boolean;
};

export const PRIORITY_OPTIONS = ["Low", "Medium", "High"];

export const PROJECT_TABLE_HEADERS = [
  "",
  "Project Name",
  "Priority",
  "Start Date",
  "End Date",
  "CreatedAt",
  "Tasks Done",
  "Tasks TotaL",
  "Progress Bar",
  "",
];

export const TASK_TABLE_HEADERS = [
  "",
  "Task Name",
  "Start Date",
  "End Date",
  "Created Date",
  "Status",
  "",
  "",
];

export const parseDate = (date: Date | undefined) => {
  if (date === undefined) return "";
  let dateParsed: Date = new Date(date);
  return `${dateParsed.getFullYear()}-${dateParsed.getMonth() + 1}-${dateParsed.getDate()}`;
};

export const formatDate = (date: Date) => {
  return date.toISOString().slice(0, 10);
};
