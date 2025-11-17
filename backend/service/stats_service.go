package service

import (
	"time"

	"github.com/nao-takechi/poker-insight/models"
	"github.com/nao-takechi/poker-insight/repository"
)

type StatsServiceInterface interface {
	GetSummary() (models.Summary, error)
	GetMonthlyProfit(months int) ([]models.MonthlyProfit, error)

}

type StatsService struct {
	repo repository.StatsRepository
}

func NewStatsService(r repository.StatsRepository) *StatsService {
	return &StatsService{repo: r}
}

func (s *StatsService) GetSummary() (models.Summary, error) {

	// --- 1. セッション総数 ---
	count, err := s.repo.CountSessions()
	if err != nil {
		return models.Summary{}, err
	}
	// 0件なら全て 0 を返す
	if count == 0 {
		return models.Summary{}, nil
	}

	// --- 2. 総収支の合計（result - buy_in - other_cost の合計） ---
	total, err := s.repo.TotalProfit()
	if err != nil {
		return models.Summary{}, err
	}

	// --- 3. 勝ちセッション数（利益 > 0 の件数） ---
	win, err := s.repo.WinningSessions()
	if err != nil {
		return models.Summary{}, err
	}

	// --- 4. 平均収支 ---
	avg := int(total / count)

	// --- 5. 勝率 ---
	rate := float64(win) / float64(count)

	// Summary DTO に詰めて返す
	return models.Summary{
		WinRate:       rate,
		TotalProfit:   int(total),
		AverageProfit: avg,
		SessionCount:  int(count),
	}, nil
}

func (s *StatsService) GetMonthlyProfit(months int) ([]models.MonthlyProfit, error) {
	// DB から「ある月のみ」取得
	dbResults, err := s.repo.MonthlyProfit(months)
	if err != nil {
		return nil, err
	}

	// マップ化（補完しやすいため）
	profitMap := make(map[string]int)
	for _, item := range dbResults {
		profitMap[item.Month] = item.Profit // ← int64 → int に変換済み
	}

	// 今の月から n ヶ月分を埋める
	now := time.Now()
	var results []models.MonthlyProfit

	for i := range months { 
		target := now.AddDate(0, -i, 0).Format("2006-01")

		profit := profitMap[target]

		results = append(results, models.MonthlyProfit{
			Month:  target,
			Profit: profit,
		})
	}

	return results, nil
}
