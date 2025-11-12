package handlers

import (
	"github.com/gofiber/fiber/v2"
	"github.com/nao-takechi/poker-insight/models"
	"github.com/nao-takechi/poker-insight/service"
)

type SessionHandler struct {
	service service.SessionService
}

func NewSessionHandler(s service.SessionService) *SessionHandler {
	return &SessionHandler{service: s}
}

func (h *SessionHandler) CreateSession(c *fiber.Ctx) error {
	var session models.Session
	if err := c.BodyParser(&session); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "invalid body"})
	}

	if err := h.service.CreateSession(&session); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": err.Error()})
	}

	return c.Status(fiber.StatusCreated).JSON(session)
}

func (h *SessionHandler) GetSessions(c *fiber.Ctx) error {
	sessions, err := h.service.GetAllSessions()
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
	}
	return c.JSON(sessions)
}
