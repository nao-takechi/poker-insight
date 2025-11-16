package integration

import (
	"testing"

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
