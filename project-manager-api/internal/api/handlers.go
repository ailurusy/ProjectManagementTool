package api

import (
	"errors"
	"log"
	"net/http"
	"project-manager/internal"
	"project-manager/internal/dao"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

// PROJECT API Handlers

// GetProjects to get all the projects (currrently stored in the "dummy DB" - dao->dataManipulation)
func GetProjects(c *gin.Context) {
	projects, err := dao.FetchProjects()
	if err != nil {
		log.Printf("Failed to fetch projects: %v", err)
		c.IndentedJSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch Projects"})
		return
	}
	c.IndentedJSON(http.StatusOK, projects)
}

// GetProjectById to get a specific project (found by id)
func GetProjectById(c *gin.Context) {
	id := c.Param("id")
	project, err := dao.FetchProjectById(id)
	if err != nil {
		if errors.Is(err, dao.ErrProjectNotFound) {
			log.Printf("Failed to fetch project %s: %v", id, err)
			c.IndentedJSON(http.StatusNotFound, gin.H{"error": "Project not found"})
			return
		}
		log.Printf("Failed to fetch project %s: %v", id, err)
		c.IndentedJSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch project"})
		return
	}
	c.IndentedJSON(http.StatusOK, project)
}

// PostProject to add a new project
func PostProject(c *gin.Context) {
	var reqProject internal.Project
	reqProject.ID = uuid.New().String()
	reqProject.CreatedAt = time.Now().UTC().Format("2006-01-02 15:04:05")
	if err := c.BindJSON(&reqProject); err != nil {
		log.Printf("Failed to parse new project: %v", err)
		c.IndentedJSON(http.StatusBadRequest, gin.H{"error": "Failed to parse new project"})
		return
	}
	newProject, err := dao.AddNewProject(&reqProject)
	if err != nil {
		log.Printf("Failed to add new project: %v", err)
		c.IndentedJSON(http.StatusInternalServerError, gin.H{"error": "Failed to add new project"})
	}
	c.IndentedJSON(http.StatusCreated, newProject)
}

// UpdateProject to update specific project (found by id)
func UpdateProject(c *gin.Context) {
	projectID := c.Param("id")
	var req internal.ProjectPayload
	if err := c.BindJSON(&req); err != nil {
		log.Printf("Failed to parse updated project info: %v", err)
		c.IndentedJSON(http.StatusBadRequest, gin.H{"error": "Failed to parse updated project info"})
		return
	}
	updatedProject, err := dao.UpdateProject(projectID, req)
	if err != nil {
		if errors.Is(err, dao.ErrProjectNotFound) {
			log.Printf("Failed to find project %s: %v", projectID, err)
			c.IndentedJSON(http.StatusNotFound, gin.H{"error": "Project not found"})
			return
		}
		log.Printf("Failed to update project %s: %v", projectID, err)
		c.IndentedJSON(http.StatusInternalServerError, gin.H{"error": "Failed to update project"})
		return
	}
	c.IndentedJSON(http.StatusOK, updatedProject)
}

// DeleteProject to delete specific project (found by id)
func DeleteProject(c *gin.Context) {
	projectId := c.Param("id")
	err := dao.DeleteProjectById(projectId)
	if err != nil {
		if errors.Is(err, dao.ErrProjectNotFound) {
			log.Printf("Project with id %s not found: %v", projectId, err)
			c.IndentedJSON(http.StatusNotFound, gin.H{"error": "Project not found"})
			return
		}
		log.Printf("Failed to delete project %s: %v", projectId, err)
		c.IndentedJSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete project"})
		return
	}
	c.IndentedJSON(http.StatusOK, gin.H{"message": "Project has been successfully deleted"})
}

//TASK API Handlers

// PostTask to add a new task to the project (found by id)
func PostTask(c *gin.Context) {
	projectId := c.Param("id")
	var reqTask internal.Task
	reqTask.ID = uuid.New().String()
	reqTask.CreatedAt = time.Now().UTC().Format("2006-01-02 15:04:05")
	if err := c.BindJSON(&reqTask); err != nil {
		log.Printf("Failed to parse new task: %v", err)
		c.IndentedJSON(http.StatusBadRequest, gin.H{"error": "Failed to parse new task"})
		return
	}
	newTask, err := dao.AddNewTask(projectId, &reqTask)
	if err != nil {
		log.Printf("Failed to add new task: %v", err)
		c.IndentedJSON(http.StatusInternalServerError, gin.H{"error": "Failed to add new task"})
	}
	c.IndentedJSON(http.StatusCreated, newTask)
}

// UpdateTask to update the task (found by task_id) in the project (found by id)
func UpdateTask(c *gin.Context) {
	projectId := c.Param("id")
	taskId := c.Param("task_id")

	var req internal.TaskPayload
	if err := c.BindJSON(&req); err != nil {
		log.Printf("Failed to parse updated task info: %v", err)
		c.IndentedJSON(http.StatusBadRequest, gin.H{"error": "Failed to parse updated task info"})
		return
	}
	updatedTask, err := dao.UpdateTask(projectId, taskId, req)
	if err != nil {
		if errors.Is(err, dao.ErrProjectNotFound) {
			log.Printf("Project with id %s not found: %v", projectId, err)
			c.IndentedJSON(http.StatusNotFound, gin.H{"error": "Project not found"})
			return
		}
		if errors.Is(err, dao.ErrTaskNotFound) {
			log.Printf("Task with id %s not found: %v", taskId, err)
			c.IndentedJSON(http.StatusNotFound, gin.H{"error": "Task not found"})
			return
		}
		log.Printf("Failed to update task %s in the project %s : %v", taskId, projectId, err)
		c.IndentedJSON(http.StatusInternalServerError, gin.H{"error": "Failed to update task"})
		return
	}
	c.IndentedJSON(http.StatusOK, updatedTask)
}

// DeleteTask to delete a task (found by task_id) in the project (found by id)
func DeleteTask(c *gin.Context) {
	message := "Task has been successfully deleted"
	projectId := c.Param("id")
	taskId := c.Param("task_id")
	err := dao.DeleteTaskById(projectId, taskId)
	if err != nil {
		if errors.Is(err, dao.ErrProjectNotFound) {
			log.Printf("Project with id %s not found: %v", projectId, err)
			c.IndentedJSON(http.StatusNotFound, gin.H{"error": "Project not found"})
			return
		}
		if errors.Is(err, dao.ErrTaskNotFound) {
			log.Printf("Task with id %s not found: %v", taskId, err)
			c.IndentedJSON(http.StatusNotFound, gin.H{"error": "Task not found"})
			return
		}
		log.Printf("Failed to delete task %s in the project %s : %v", taskId, projectId, err)
		c.IndentedJSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete task"})
		return
	}
	c.IndentedJSON(http.StatusOK, message)
}
