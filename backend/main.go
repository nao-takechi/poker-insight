package main

import (
	"github.com/nao-takechi/poker-insight/backend/router"

	"github.com/nao-takechi/poker-insight/backend/models"

	"github.com/gofiber/fiber/v2"
)

func main() {
	app := fiber.New()

	models.ConnectDB()
	router.SetupRoutes(app)

	app.Listen(":8080")
}
