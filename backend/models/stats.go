package models

type Summary struct {
	WinRate       float64 `json:"winRate"`
	TotalProfit   int     `json:"totalProfit"`
	AverageProfit int     `json:"averageProfit"`
	SessionCount  int     `json:"sessionCount"`
}

type MonthlyProfit struct {
	Month  string `json:"month"`
	Profit int    `json:"profit"`
}