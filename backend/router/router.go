package router

import (
	"github.com/gofiber/fiber/v2"
	"github.com/nao-takechi/poker-insight/handlers"
)

func SetupRoutes(app *fiber.App, sessionHandler *handlers.SessionHandler) {
	api := app.Group("/api")
	api.Post("/sessions", sessionHandler.CreateSession)
	api.Get("/sessions", sessionHandler.GetSessions)
}