package handlers

import (
	"github.com/gofiber/fiber/v2"
	"github.com/nao-takechi/poker-insight/service"
)

type StatsHandler struct {
	service service.StatsServiceInterface
}

func NewStatsHandler(s service.StatsServiceInterface) *StatsHandler {
	return &StatsHandler{service: s}
}

func (h *StatsHandler) GetSummary(c *fiber.Ctx) error {
	summary, err := h.service.GetSummary()
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": err.Error()})
	}
	return c.JSON(summary)
}

func (h *StatsHandler) GetMonthly(c *fiber.Ctx) error {
    months := c.QueryInt("months", 6)
    if months <= 0 {
        months = 6
    }

    data, err := h.service.GetMonthlyProfit(months)
    if err != nil {
        return c.Status(500).JSON(fiber.Map{"error": err.Error()})
    }

    return c.JSON(data)
}
