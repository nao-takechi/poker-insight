package models

import "time"

type Session struct {
	ID        uint      `gorm:"primaryKey"`
	Type      string
	BuyIn     int
	Result    int
	OtherCost int
	Note      string
	CreatedAt time.Time
}