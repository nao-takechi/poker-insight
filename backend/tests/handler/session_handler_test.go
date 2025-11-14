package handler

import (
	"bytes"
	"net/http/httptest"
	"testing"
	"time"

	"github.com/gofiber/fiber/v2"
	gen "github.com/nao-takechi/poker-insight/gen"
	"github.com/nao-takechi/poker-insight/handlers"
	"github.com/nao-takechi/poker-insight/models"
	"github.com/stretchr/testify/assert"
)

// --- モックサービス定義 ---
type mockService struct {
	CreateSessionFn  func(gen.SessionInput) (models.Session, error)
	GetAllSessionsFn func() ([]models.Session, error)
}

func (m *mockService) CreateSession(input gen.SessionInput) (models.Session, error) {
	return m.CreateSessionFn(input)
}

func (m *mockService) GetAllSessions() ([]models.Session, error) {
	return m.GetAllSessionsFn()
}

// GET /sessions
func TestGetSessionsHandler(t *testing.T) {
	app := fiber.New()

	mockSvc := &mockService{
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

// POST /sessions
func TestCreateSessionHandler(t *testing.T) {
	app := fiber.New()

	mockSvc := &mockService{
		CreateSessionFn: func(input gen.SessionInput) (models.Session, error) {
			return models.Session{
				ID:        5,
				Type:      string(input.Type),
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
