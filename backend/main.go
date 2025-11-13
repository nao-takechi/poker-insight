package main

import (
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/nao-takechi/poker-insight/handlers"
	"github.com/nao-takechi/poker-insight/models"
	"github.com/nao-takechi/poker-insight/repository"
	"github.com/nao-takechi/poker-insight/router"
	"github.com/nao-takechi/poker-insight/service"
)

func main() {
	// DB初期化
	models.ConnectDB() 

	// 依存性注入
	repo := repository.NewSessionRepository(models.DB)
	svc := service.NewSessionService(repo)
	handler := handlers.NewSessionHandler(svc)
	
	// Fiber初期化
	app := fiber.New()
	router.SetupRoutes(app, handler)
	
	// Webサーバ起動
	if err := app.Listen(":8080"); err != nil {
		log.Fatalf("failed to start server: %v", err)
	}
}
