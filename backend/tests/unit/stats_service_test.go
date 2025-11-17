package unit

import (
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/mock"

	"github.com/nao-takechi/poker-insight/models"
	"github.com/nao-takechi/poker-insight/service"
)

/* --- Mock Repository --- */

// testify/mock で StatsRepository の mock を作る
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

/* --- テスト本体 --- */

func TestGetSummary(t *testing.T) {
	// Setup
	mockRepo := new(MockStatsRepo)
	svc := service.NewStatsService(mockRepo)
	
	// Prepare
	mockRepo.On("CountSessions").Return(int64(10), nil)
	mockRepo.On("TotalProfit").Return(int64(50000), nil)
	mockRepo.On("WinningSessions").Return(int64(6), nil)

	// Execute
	result, err := svc.GetSummary()

	// Verify
	assert.NoError(t, err)
	assert.Equal(t, 10, result.SessionCount)
	assert.Equal(t, 50000, result.TotalProfit)
	assert.Equal(t, 5000, result.AverageProfit)     // 50000 / 10
	assert.InDelta(t, 0.6, result.WinRate, 0.001) // 6/10 ＝ 0.6
}

func TestGetSummary_WhenZeroSessions(t *testing.T) {
	// Setup
	mockRepo := new(MockStatsRepo)
	svc := service.NewStatsService(mockRepo)

	// Prepare
	mockRepo.On("CountSessions").Return(int64(0), nil)

	// Execute
	result, err := svc.GetSummary()

	// Verify
	assert.NoError(t, err)
	assert.Equal(t, 0, result.SessionCount)
	assert.Equal(t, 0, result.TotalProfit)
	assert.Equal(t, 0, result.AverageProfit)
	assert.Equal(t, 0.0, result.WinRate)
}
