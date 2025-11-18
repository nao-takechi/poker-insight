package unit

import (
	"testing"
	"time"

	"github.com/stretchr/testify/assert"

	"github.com/nao-takechi/poker-insight/models"
	"github.com/nao-takechi/poker-insight/service"
	handlermock "github.com/nao-takechi/poker-insight/tests/unit/mock"
)

func TestGetSummary(t *testing.T) {
	// Setup
	mockRepo := new(handlermock.MockStatsRepo)
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
	mockRepo := new(handlermock.MockStatsRepo)
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

func TestGetMonthlyProfit_FillsMissingMonths_6Months(t *testing.T) {
	// Setup
	mockRepo := new(handlermock.MockStatsRepo)
	svc := service.NewStatsService(mockRepo)

	// Prepare
	months := 6
	now := time.Now()

	// 月リスト生成（m0: 今月, m1: 1ヶ月前, ...）
	var monthsList []string
	for i := range months {
		monthsList = append(monthsList,
			now.AddDate(0, -i, 0).Format("2006-01"))
	}

	m0, m1, m2, m3, m4, m5 := monthsList[0], monthsList[1], monthsList[2], monthsList[3], monthsList[4], monthsList[5]

	// set stub
	mockRepo.On("MonthlyProfit", months).Return([]models.MonthlyProfit{
		{Month: m1, Profit: 1000},  // 1ヶ月前は 1000
		{Month: m4, Profit: -500},  // 4ヶ月前は -500
	}, nil)

	// Execute
	results, err := svc.GetMonthlyProfit(months)

	// Verify
	assert.NoError(t, err)
	assert.Len(t, results, 6)

	expected := []models.MonthlyProfit{
		{Month: m0, Profit: 0},
		{Month: m1, Profit: 1000},
		{Month: m2, Profit: 0},
		{Month: m3, Profit: 0},
		{Month: m4, Profit: -500},
		{Month: m5, Profit: 0},
	}

	assert.Equal(t, expected, results)
}
