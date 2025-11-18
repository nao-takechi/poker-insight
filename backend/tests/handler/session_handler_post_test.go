package handler_test

import (
	"bytes"
	"net/http/httptest"
	"testing"
	"time"

	"github.com/gofiber/fiber/v2"
	gen "github.com/nao-takechi/poker-insight/gen"
	"github.com/nao-takechi/poker-insight/handlers"
	"github.com/nao-takechi/poker-insight/models"
	handlermock "github.com/nao-takechi/poker-insight/tests/handler/mock"
	"github.com/stretchr/testify/assert"
)

func TestCreateSessionHandler(t *testing.T) {
	app := fiber.New()

	mockSvc := &handlermock.MockSessionService{
		CreateSessionFn: func(input gen.SessionInput) (models.Session, error) {
			return models.Session{
				ID:        5,
				Type:      models.SessionType(input.Type),
				BuyIn:     input.BuyIn,
				Result:    input.Result,
				OtherCost: 200,
				Note:      "test memo",
				CreatedAt: time.Now(),
			}, nil
		},
	}

	handler := handlers.NewSessionHandler(mockSvc)
	app.Post("/sessions", handler.CreateSession)

	body := []byte(`{
		"type": "ring",
		"buyIn": 2000,
		"result": 2500,
		"otherCost": 200,
		"note": "test memo",
		"createdAt": "2025-11-13T12:00:00Z"
	}`)

	req := httptest.NewRequest("POST", "/sessions", bytes.NewReader(body))
	req.Header.Set("Content-Type", "application/json")

	resp, _ := app.Test(req, -1)

	assert.Equal(t, 201, resp.StatusCode)
}
