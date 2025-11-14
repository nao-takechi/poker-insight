package models

import "time"

type SessionType string

const (
	Tournament SessionType = "tournament"
	Ring       SessionType = "ring"
)

type Session struct {
	ID        uint        `gorm:"primaryKey"`
	Type      SessionType `json:"type"`
	BuyIn     int
	Result    int
	OtherCost int
	Note      string
	CreatedAt time.Time
}
