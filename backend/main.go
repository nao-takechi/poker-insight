package main

import (
	"github.com/gofiber/fiber/v2"
	"github.com/nao-takechi/poker-insight/backend/handlers"
	"github.com/nao-takechi/poker-insight/backend/models"
	"github.com/nao-takechi/poker-insight/backend/repository"
	"github.com/nao-takechi/poker-insight/backend/router"
	"github.com/nao-takechi/poker-insight/backend/service"
)

func main() {
	models.ConnectDB() // DB初期化は既存関数を想定

	app := fiber.New()

	repo := repository.NewSessionRepository(models.DB)
	svc := service.NewSessionService(repo)
	handler := handlers.NewSessionHandler(svc)

	router.SetupRoutes(app, handler)
	app.Listen(":8080")
}
