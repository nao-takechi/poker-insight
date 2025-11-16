package repository

import (
	"github.com/nao-takechi/poker-insight/models"
	"gorm.io/gorm"
)

type StatsRepository struct {
	DB *gorm.DB
}

func (r *StatsRepository) CountSessions() (int64, error) {
    var count int64
    err := r.DB.Model(&models.Session{}).Count(&count).Error
    return count, err
}

func (r *StatsRepository) TotalProfit() (int64, error) {
    var total int64
    err := r.DB.Model(&models.Session{}).
        Select("SUM(result - buy_in - other_cost)").
        Scan(&total).Error
    return total, err
}

func (r *StatsRepository) WinningSessions() (int64, error) {
    var win int64
    err := r.DB.Model(&models.Session{}).
        Where("(result - buy_in - other_cost) > 0").
        Count(&win).Error
    return win, err
}
