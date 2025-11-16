package handlers

import (
	"github.com/gofiber/fiber/v2"
	"github.com/nao-takechi/poker-insight/service"
)

type StatsHandler struct {
	service *service.StatsService
}

func NewStatsHandler(s *service.StatsService) *StatsHandler {
	return &StatsHandler{service: s}
}

func (h *StatsHandler) GetSummary(c *fiber.Ctx) error {
	summary, err := h.service.GetSummary()
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": err.Error()})
	}
	return c.JSON(summary)
}
