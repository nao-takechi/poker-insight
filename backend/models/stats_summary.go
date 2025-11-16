package models

type StatsSummary struct {
	WinRate       float64 `json:"winRate"`
	TotalProfit   int     `json:"totalProfit"`
	AverageProfit int     `json:"averageProfit"`
	SessionCount  int     `json:"sessionCount"`
}
