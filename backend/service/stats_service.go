package service

import (
	"github.com/nao-takechi/poker-insight/models"
	"github.com/nao-takechi/poker-insight/repository"
)


type StatsService struct {
	repo *repository.StatsRepository
}

func NewStatsService(r *repository.StatsRepository) *StatsService {
	return &StatsService{repo: r}
}

func (s *StatsService) GetSummary() (models.StatsSummary, error) {
    count, err := s.repo.CountSessions()
    if err != nil {
        return models.StatsSummary{}, err
    }

    if count == 0 {
        return models.StatsSummary{}, nil
    }

    total, err := s.repo.TotalProfit()
    if err != nil {
        return models.StatsSummary{}, err
    }

    win, err := s.repo.WinningSessions()
    if err != nil {
        return models.StatsSummary{}, err
    }

    avg := int(total / count)
    rate := float64(win) / float64(count)

    return models.StatsSummary{
        WinRate:       rate,
        TotalProfit:   int(total),
        AverageProfit: avg,
        SessionCount:  int(count),
    }, nil
}
