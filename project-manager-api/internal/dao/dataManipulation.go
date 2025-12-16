package dao

import (
	"errors"
	"project-manager/internal"

	"github.com/google/uuid"
)

var dummyStoreProjects = []internal.Project{
	{ID: uuid.New().String(), Name: "Project #1", Description: "Project-Description-1", CreatedAt: "2025-06-19", StartDate: "2025-06-20", EndDate: "2025-06-27", Priority: "Low",
		Tasks: []internal.Task{
			{ID: uuid.New().String(), Title: "Task #1", Description: "Task-Description-1", CreatedAt: "2025-06-19", StartDate: "2025-06-20", EndDate: "2025-06-26", Priority: "Low", Completed: false},
			{ID: uuid.New().String(), Title: "Task #2", Description: "Task-Description-2", CreatedAt: "2025-06-19", StartDate: "2025-06-21", EndDate: "2025-06-27", Priority: "Low", Completed: true},
		}},
	{ID: uuid.New().String(), Name: "Project #2", Description: "Project-Description-2", CreatedAt: "2025-06-19", StartDate: "2025-06-22", EndDate: "2025-06-29", Priority: "Medium",
		Tasks: []internal.Task{
			{ID: uuid.New().String(), Title: "Task #3", Description: "Task-Description-1", CreatedAt: "2025-06-19", StartDate: "2025-06-22", EndDate: "2025-06-28", Priority: "Low", Completed: false},
			{ID: uuid.New().String(), Title: "Task #4", Description: "Task-Description-1", CreatedAt: "2025-06-19", StartDate: "2025-06-23", EndDate: "2025-06-29", Priority: "Low", Completed: true},
		}},
	{ID: uuid.New().String(), Name: "Project #3", Description: "Project-Description-3", CreatedAt: "2025-06-19", StartDate: "2025-06-24", EndDate: "2025-07-01", Priority: "High", Tasks: []internal.Task{
		{ID: uuid.New().String(), Title: "Task #5", Description: "Task-Description-1", CreatedAt: "2025-06-19", StartDate: "2025-06-24", EndDate: "2025-06-30", Priority: "Low", Completed: false},
		{ID: uuid.New().String(), Title: "Task #6", Description: "Task-Description-1", CreatedAt: "2025-06-19", StartDate: "2025-06-25", EndDate: "2025-07-01", Priority: "Low", Completed: true},
	}},
}

var ErrProjectNotFound = errors.New("Project not found")
var ErrTaskNotFound = errors.New("Task not found")

// PROJECTS data manipulation - FetchProjects, FetchProjectById, AddNewProject, UpdateProject, DeleteProjectByID
func FetchProjects() ([]internal.Project, error) {
	//Error Simulation -- Uncomment to test
	//return nil, errors.New("Database connection failed")

	//Dummy Data
	return dummyStoreProjects, nil
}

func FetchProjectById(id string) (*internal.Project, error) {
	for _, project := range dummyStoreProjects {
		if project.ID == id {
			return &project, nil
		}
	}
	return nil, ErrProjectNotFound
}

func AddNewProject(project *internal.Project) (*internal.Project, error) {
	//Error Simulation -- Uncomment to test
	//return nil, errors.New("Database connection failed")

	dummyStoreProjects = append(dummyStoreProjects, *project)
	return project, nil
}

func UpdateProject(projectId string, payload internal.ProjectPayload) (*internal.Project, error) {
	project, err := FetchProjectById(projectId)
	if err != nil {
		return nil, err
	}

	if payload.Name != nil {
		project.Name = *payload.Name
	}
	if payload.Description != nil {
		project.Description = *payload.Description
	}
	if payload.Priority != nil {
		project.Priority = *payload.Priority
	}
	if payload.StartDate != nil {
		project.StartDate = *payload.StartDate
	}
	if payload.EndDate != nil {
		project.EndDate = *payload.EndDate
	}

	for i := range dummyStoreProjects {
		if dummyStoreProjects[i].ID == project.ID {
			dummyStoreProjects[i] = *project
			return project, nil
		}
	}
	return nil, ErrProjectNotFound
}

func DeleteProjectById(projectId string) error {
	found := false
	for i, project := range dummyStoreProjects {
		if project.ID == projectId {
			dummyStoreProjects = append(dummyStoreProjects[:i], dummyStoreProjects[i+1:]...)
			found = true
			break
		}
	}
	if !found {
		return ErrProjectNotFound
	}
	return nil
}

// TASKS data manipulation - AddNewTask, UpdateTask, DeleteTaskById
func AddNewTask(projectId string, task *internal.Task) (*internal.Task, error) {
	for i := range dummyStoreProjects {
		if dummyStoreProjects[i].ID == projectId {
			dummyStoreProjects[i].Tasks = append(dummyStoreProjects[i].Tasks, *task)
			return task, nil
		}
	}
	return nil, ErrProjectNotFound
}

func UpdateTask(projectId string, taskId string, payload internal.TaskPayload) (*internal.Task, error) {
	project, err := FetchProjectById(projectId)
	if err != nil {
		return nil, err
	}

	var updatedTask *internal.Task

	for index := range project.Tasks {
		task := &project.Tasks[index]
		if task.ID == taskId {
			if payload.Title != nil {
				task.Title = *payload.Title
			}
			if payload.Description != nil {
				task.Description = *payload.Description
			}
			if payload.StartDate != nil {
				task.StartDate = *payload.StartDate
			}
			if payload.EndDate != nil {
				task.EndDate = *payload.EndDate
			}
			if payload.Priority != nil {
				task.Priority = *payload.Priority
			}
			if payload.Completed != nil {
				task.Completed = *payload.Completed
			}
			updatedTask = task
			break
		}
	}

	if updatedTask == nil {
		return nil, ErrTaskNotFound
	}

	for i := range dummyStoreProjects {
		if dummyStoreProjects[i].ID == project.ID {
			for index := range dummyStoreProjects[i].Tasks {
				if dummyStoreProjects[i].Tasks[index].ID == taskId {
					dummyStoreProjects[i].Tasks[index] = *updatedTask
					return updatedTask, nil
				}
			}
			break
		}
	}
	return nil, ErrTaskNotFound
}

func DeleteTaskById(projectId, taskId string) error {
	foundProject := false
	foundTask := false
	for i := range dummyStoreProjects {
		if dummyStoreProjects[i].ID == projectId {
			foundProject = true
			for index := range dummyStoreProjects[i].Tasks {
				if dummyStoreProjects[i].Tasks[index].ID == taskId {
					dummyStoreProjects[i].Tasks = append(dummyStoreProjects[i].Tasks[:index], dummyStoreProjects[i].Tasks[index+1:]...)
					foundTask = true
					break
				}
			}
			break
		}
	}
	if !foundProject {
		return ErrProjectNotFound
	}
	if !foundTask {
		return ErrTaskNotFound
	}
	return nil
}
