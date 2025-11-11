package router

import (
	"github.com/gofiber/fiber/v2"
	"github.com/nao-takechi/poker-insight/backend/handlers"
)

func SetupRoutes(app *fiber.App) {
	api := app.Group("/api")

	api.Post("/sessions", handlers.CreateSession)
	api.Get("/sessions", handlers.GetSessions)
	// api.Get("/stats/summary", handlers.GetStatsSummary)
	// api.Post("/chat", handlers.GetStatsSummary)
}
