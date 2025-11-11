package models

import (
	"time"
)

type SessionType string

const (
	Tournament SessionType = "tournament"
	Ring       SessionType = "ring"
)

type Session struct {
	ID        uint        `gorm:"primaryKey"`
	Type      SessionType `json:"type"`
	BuyIn     int         `json:"buy_in"`
	Result    int         `json:"result"`
	OtherCost int         `json:"other_cost"`
	Note      string      `json:"note"`
	CreatedAt time.Time   `json:"created_at"`
}
