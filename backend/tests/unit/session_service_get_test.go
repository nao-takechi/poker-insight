package unit

import (
	"testing"

	"github.com/nao-takechi/poker-insight/models"
	"github.com/nao-takechi/poker-insight/service"
	handlermock "github.com/nao-takechi/poker-insight/tests/unit/mock"
	"github.com/stretchr/testify/assert"
)

// --- モック（上の mockRepo を再利用） ---

// --- 正常系：セッション一覧取得 ---
func TestSessionServiceGetAllSessions(t *testing.T) {
	mockR := new(handlermock.MockSessionRepo)
	svc := service.NewSessionService(mockR)

	expected := []models.Session{
		{
			ID:     1,
			Type:   "ring",
			BuyIn:  1000,
			Result: 1500,
			Note:   "メモ1",
		},
		{
			ID:     2,
			Type:   "tournament",
			BuyIn:  5000,
			Result: 18000,
			Note:   "ファイナルテーブル進出！",
		},
	}

	// リポジトリの返り値をモック
	mockR.
		On("FindAll").
		Return(expected, nil)

	// 実行
	sessions, err := svc.GetAllSessions()

	// 検証
	assert.NoError(t, err)
	assert.Equal(t, expected, sessions)
	mockR.AssertExpectations(t)
}

// --- 異常系：リポジトリがエラーを返した場合 ---
func TestSessionServiceGetAllSessions_Error(t *testing.T) {
	mockR := new(handlermock.MockSessionRepo)
	svc := service.NewSessionService(mockR)

	mockErr := assert.AnError

	mockR.
		On("FindAll").
		Return([]models.Session{}, mockErr)

	sessions, err := svc.GetAllSessions()

	assert.Error(t, err)
	assert.ErrorIs(t, err, mockErr)
	assert.Len(t, sessions, 0)
	mockR.AssertExpectations(t)
}
