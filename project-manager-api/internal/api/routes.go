package api

import "github.com/gin-gonic/gin"

// RegisterRoutes defines api endpoints for project and task
func RegisterRoutes(r *gin.Engine) {

	api := r.Group("/api")

	//GET endpoints
	api.GET("/projects", GetProjects)
	api.GET("/projects/:id", GetProjectById)

	//POST endpoints
	api.POST("/projects", PostProject)
	api.POST("/projects/:id/tasks", PostTask)

	//PATCH endpoints
	api.PATCH("/projects/:id", UpdateProject)
	api.PATCH("/projects/:id/tasks/:task_id", UpdateTask)

	//DELETE endpoints
	api.DELETE("/projects/:id", DeleteProject)
	api.DELETE("/projects/:id/tasks/:task_id", DeleteTask)
}
