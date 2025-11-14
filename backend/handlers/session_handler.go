package handlers

import (
	"github.com/gofiber/fiber/v2"
	gen "github.com/nao-takechi/poker-insight/gen"
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
	var input gen.SessionInput
	if err := c.BodyParser(&input); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "invalid body"})
	}
	session, err := h.service.CreateSession(input)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": err.Error()})
	}
	return c.Status(fiber.StatusCreated).JSON(models.ToAPISession(session))
}

func (h *SessionHandler) GetSessions(c *fiber.Ctx) error {
	list, err := h.service.GetAllSessions()
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
	}
	return c.JSON(models.ToAPISessionList(list))
}
