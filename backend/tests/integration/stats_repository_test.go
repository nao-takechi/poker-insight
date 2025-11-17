package integration

import (
	"testing"
	"time"

	"github.com/nao-takechi/poker-insight/models"
	"github.com/nao-takechi/poker-insight/repository"
	"github.com/nao-takechi/poker-insight/tests/integration/testutils"
	"github.com/stretchr/testify/assert"
)

func TestStatsRepository(t *testing.T) {
	// Setup
	testDB := testutils.SetupTestDB(t)
	db := testDB.DB
	repo := repository.NewStatsRepository(db)

	// Prepare
	// セッション3件:　+500（勝ち）、-200（負け）、+700（勝ち）
	sessions := []models.Session{
		{Type: "ring", BuyIn: 1000, Result: 1500, OtherCost: 0},
		{Type: "ring", BuyIn: 1200, Result: 1000, OtherCost: 0},
		{Type: "ring", BuyIn: 2000, Result: 2700, OtherCost: 0},
	}
	for _, s := range sessions {
		err := db.Create(&s).Error
		assert.NoError(t, err)
	}

	// Execute
	count, errCount := repo.CountSessions()
	total, errTotal := repo.TotalProfit()
	win, errWin := repo.WinningSessions()

	// Verify
	assert.NoError(t, errCount)
	assert.Equal(t, int64(3), count)

	assert.NoError(t, errTotal)
	assert.Equal(t, int64(1000), total) // 500 + (-200) + 700

	assert.NoError(t, errWin)
	assert.Equal(t, int64(2), win)      // 勝ち2件（500, 700）
}

func TestStatsRepository_MonthlyProfit(t *testing.T) {
	// Setup
	testDB := testutils.SetupTestDB(t)
	db := testDB.DB
	repo := repository.NewStatsRepository(db)
	now := time.Now()

	// Prepare
	// 今月: +500
	// 2 ヶ月前: -300
	// 4 ヶ月前: +1000
	sessions := []models.Session{
		{
			Type:      "ring",
			BuyIn:     1000,
			Result:    1500,
			OtherCost: 0,
			CreatedAt: now, // 今月
		},
		{
			Type:      "ring",
			BuyIn:     1300,
			Result:    1000,
			OtherCost: 0,
			CreatedAt: now.AddDate(0, -2, 0), // 2ヶ月前
		},
		{
			Type:      "ring",
			BuyIn:     500,
			Result:    1500,
			OtherCost: 0,
			CreatedAt: now.AddDate(0, -4, 0), // 4ヶ月前
		},
	}

	for _, s := range sessions {
		err := db.Create(&s).Error
		assert.NoError(t, err)
	}

	// Execute
	results, err := repo.MonthlyProfit(6)

	// Verify
	assert.NoError(t, err)

	// repo は "存在する月だけ" を返すので 3 件のはず
	assert.Len(t, results, 3)

	// 月を新しい順に取得している
	expectedMonths := []string{
		now.Format("2006-01"),
		now.AddDate(0, -2, 0).Format("2006-01"),
		now.AddDate(0, -4, 0).Format("2006-01"),
	}

	expectedProfits := []int64{
		500,  // 今月
		-300, // 2ヶ月前
		1000, // 4ヶ月前
	}

	for i, r := range results {
		assert.Equal(t, expectedMonths[i], r.Month)
		assert.Equal(t, expectedProfits[i], int64(r.Profit))
	}
}
