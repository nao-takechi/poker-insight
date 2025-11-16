package router

import (
	"github.com/gofiber/fiber/v2"
	"github.com/nao-takechi/poker-insight/handlers"
)

func SetupRoutes(
	app *fiber.App,
	sessionHandler *handlers.SessionHandler,
	statsHandler *handlers.StatsHandler,
) {
	api := app.Group("/api")

	api.Post("/sessions", sessionHandler.CreateSession)
	api.Get("/sessions", sessionHandler.GetSessions)

	api.Get("/stats/summary", statsHandler.GetSummary)
	api.Get("/stats/monthly", statsHandler.GetMonthly)
}
