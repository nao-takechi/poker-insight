package handlers

import (
	"github.com/gofiber/fiber/v2"
	"github.com/nao-takechi/poker-insight/backend/models"
)

func CreateSession(c *fiber.Ctx) error {
	var session models.Session
	if err := c.BodyParser(&session); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "invalid body"})
	}
	models.DB.Create(&session)
	return c.Status(201).JSON(session)
}

func GetSessions(c *fiber.Ctx) error {
	var sessions []models.Session
	models.DB.Find(&sessions)
	return c.JSON(sessions)
}
