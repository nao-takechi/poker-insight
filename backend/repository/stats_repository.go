package repository

import (
	"github.com/nao-takechi/poker-insight/models"
	"gorm.io/gorm"
)

type StatsRepository interface {
	CountSessions() (int64, error)
	TotalProfit() (int64, error)
	WinningSessions() (int64, error)
}

type statsRepository struct {
	DB *gorm.DB
}

func NewStatsRepository(db *gorm.DB) StatsRepository {
	return &statsRepository{DB: db}
}

// セッション数を取得
func (r *statsRepository) CountSessions() (int64, error) {
	var count int64
	err := r.DB.Model(&models.Session{}).Count(&count).Error
	return count, err
}

// 総収支（result - buy_in - other_cost の合計値）を取得
func (r *statsRepository) TotalProfit() (int64, error) {
	var total int64
	err := r.DB.Model(&models.Session{}).
		Select("SUM(result - buy_in - other_cost)").
		Scan(&total).Error
	return total, err
}

// 勝ち（利益 > 0）セッション数を取得
func (r *statsRepository) WinningSessions() (int64, error) {
	var win int64
	err := r.DB.Model(&models.Session{}).
		Where("(result - buy_in - other_cost) > 0").
		Count(&win).Error
	return win, err
}
