package handler

import (
	"bytes"
	"net/http/httptest"
	"testing"

	"github.com/gofiber/fiber/v2"
	"github.com/nao-takechi/poker-insight/handlers"
	"github.com/nao-takechi/poker-insight/models"
	"github.com/stretchr/testify/assert"
)

// --- モックサービス定義 ---
type mockService struct {
	createdSession *models.Session
}

func (m *mockService) GetAllSessions() ([]models.Session, error) {
	return []models.Session{
		{Type: "tournament", BuyIn: 1000, Result: 1500},
	}, nil
}

func (m *mockService) CreateSession(s *models.Session) error {
	m.createdSession = s
	return nil
}

// GET /sessions
func TestGetSessionsHandler(t *testing.T) {
	// Setup
	app := fiber.New()
	mockSvc := &mockService{}
	handler := handlers.NewSessionHandler(mockSvc)
	app.Get("/sessions", handler.GetSessions)

	// Prepare Request
	req := httptest.NewRequest("GET", "/sessions", nil)

	// Execute
	resp, _ := app.Test(req, -1)

	// Verify
	assert.Equal(t, 200, resp.StatusCode)
}

// POST /sessions
func TestCreateSessionHandler(t *testing.T) {
	// Setup
	app := fiber.New()
	mockSvc := &mockService{}
	handler := handlers.NewSessionHandler(mockSvc)
	app.Post("/sessions", handler.CreateSession)

	// Prepare Request
	body := []byte(`{"type":"cash","buy_in":2000,"result":2500}`)
	req := httptest.NewRequest("POST", "/sessions", bytes.NewReader(body))
	req.Header.Set("Content-Type", "application/json")

	// Execute
	resp, _ := app.Test(req, -1)

	// Verify
	assert.Equal(t, 201, resp.StatusCode)
	assert.NotNil(t, mockSvc.createdSession)
	assert.Equal(t, "cash", string(mockSvc.createdSession.Type))
	assert.Equal(t, 2000, mockSvc.createdSession.BuyIn)
	assert.Equal(t, 2500, mockSvc.createdSession.Result)
}
