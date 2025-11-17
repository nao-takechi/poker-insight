package handler

import (
	"encoding/json"
	"net/http/httptest"
	"testing"

	"github.com/gofiber/fiber/v2"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/mock"

	"github.com/nao-takechi/poker-insight/handlers"
	"github.com/nao-takechi/poker-insight/models"
)

// --- Mock Service ---

type MockStatsService struct {
	mock.Mock
}

func (m *MockStatsService) GetSummary() (models.Summary, error) {
	args := m.Called()
	return args.Get(0).(models.Summary), args.Error(1)
}

func (m *MockStatsService) GetMonthlyProfit(months int) ([]models.MonthlyProfit, error) {
	args := m.Called(months)
	return args.Get(0).([]models.MonthlyProfit), args.Error(1)
}

// --- テスト本体 ---

func TestStatsHandler_GetSummary(t *testing.T) {
	// Setup
	mockSvc := new(MockStatsService)
	handler := handlers.NewStatsHandler(mockSvc)

	app := fiber.New()
	app.Get("/api/stats/summary", handler.GetSummary)

	// Prepare
	expected := models.Summary{
		WinRate:       0.6,
		TotalProfit:   1000,
		AverageProfit: 333,
		SessionCount:  3,
	}
	mockSvc.On("GetSummary").Return(expected, nil)

	// Execute
	req := httptest.NewRequest("GET", "/api/stats/summary", nil)
	resp, err := app.Test(req, -1) // -1 = タイムアウトなし

	// Verify
	assert.NoError(t, err)
	assert.Equal(t, 200, resp.StatusCode)

	var body models.Summary
	err = json.NewDecoder(resp.Body).Decode(&body)
	assert.NoError(t, err)
	assert.Equal(t, expected, body)
}

func TestStatsHandler_GetMonthly(t *testing.T) {
	// Setup
	mockSvc := new(MockStatsService)
	handler := handlers.NewStatsHandler(mockSvc)

	app := fiber.New()
	app.Get("/api/stats/monthly", handler.GetMonthly)

	// Prepare
	months := 6
	expected := []models.MonthlyProfit{
		{Month: "2025-11", Profit: 500},
		{Month: "2025-10", Profit: 100},
		{Month: "2025-09", Profit: -200},
	}

	// Mock の挙動を定義
	mockSvc.On("GetMonthlyProfit", months).Return(expected, nil)

	// Execute
	req := httptest.NewRequest("GET", "/api/stats/monthly?months=6", nil)
	resp, err := app.Test(req, -1)

	// Verify
	assert.NoError(t, err)
	assert.Equal(t, 200, resp.StatusCode)

	var body []models.MonthlyProfit
	err = json.NewDecoder(resp.Body).Decode(&body)
	assert.NoError(t, err)

	assert.Equal(t, len(expected), len(body))
	assert.Equal(t, expected, body)
}
