package handlermock

import (
	"github.com/nao-takechi/poker-insight/models"
	"github.com/stretchr/testify/mock"
)

// --- モックサービス ---
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
