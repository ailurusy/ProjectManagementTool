package main

import (
	"log"
	"project-manager/internal/api"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()
	router.Use(cors.New(cors.Config{
		AllowOrigins: []string{"http://localhost:3000"},
		AllowMethods: []string{"GET", "POST", "PATCH", "DELETE"},
		AllowHeaders: []string{"Content-Type", "Authorization", "Access-Control-Allow-Origin"},
	}))
	api.RegisterRoutes(router)
	err := router.Run(":8080")
	if err != nil {
		log.Fatalf("Failed to run HTTP server: %v", err)
	}
}
