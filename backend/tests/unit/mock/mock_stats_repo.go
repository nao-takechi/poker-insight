package handlermock

import (
	"github.com/nao-takechi/poker-insight/models"
	"github.com/stretchr/testify/mock"
)

// --- モック定義 ---
type MockStatsRepo struct {
	mock.Mock
}

// interface と同じメソッドを生やす
func (m *MockStatsRepo) CountSessions() (int64, error) {
	args := m.Called()
	return args.Get(0).(int64), args.Error(1)
}

func (m *MockStatsRepo) TotalProfit() (int64, error) {
	args := m.Called()
	return args.Get(0).(int64), args.Error(1)
}

func (m *MockStatsRepo) WinningSessions() (int64, error) {
	args := m.Called()
	return args.Get(0).(int64), args.Error(1)
}

func (m *MockStatsRepo) MonthlyProfit(months int) ([]models.MonthlyProfit, error) {
    args := m.Called(months)
    return args.Get(0).([]models.MonthlyProfit), args.Error(1)
}
