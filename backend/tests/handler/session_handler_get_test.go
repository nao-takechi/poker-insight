package handler_test

import (
	"net/http/httptest"
	"testing"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/nao-takechi/poker-insight/handlers"
	"github.com/nao-takechi/poker-insight/models"
	handlermock "github.com/nao-takechi/poker-insight/tests/handler/mock"
	"github.com/stretchr/testify/assert"
)

func TestGetSessionsHandler(t *testing.T) {
	app := fiber.New()

	mockSvc := &handlermock.MockSessionService{
		GetAllSessionsFn: func() ([]models.Session, error) {
			return []models.Session{
				{
					ID:        1,
					Type:      "ring",
					BuyIn:     1000,
					Result:    1500,
					CreatedAt: time.Now(),
				},
			}, nil
		},
	}

	handler := handlers.NewSessionHandler(mockSvc)
	app.Get("/sessions", handler.GetSessions)

	req := httptest.NewRequest("GET", "/sessions", nil)
	resp, _ := app.Test(req, -1)

	assert.Equal(t, 200, resp.StatusCode)
}
