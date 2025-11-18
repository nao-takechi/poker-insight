package unit

import (
	"testing"

	gen "github.com/nao-takechi/poker-insight/gen"
	"github.com/nao-takechi/poker-insight/models"
	"github.com/nao-takechi/poker-insight/service"
	handlermock "github.com/nao-takechi/poker-insight/tests/unit/mock"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/mock"
)

// --- テスト：正常系 ---
func TestSessionServiceCreateValid(t *testing.T) {
	mockR := new(handlermock.MockSessionRepo)
	svc := service.NewSessionService(mockR)

	input := gen.SessionInput{
		Type:   gen.SessionInputTypeRing,
		BuyIn:  1000,
		Result: 1500,
		Note:   ptr("memo"),
	}

	// DB に保存される構造体を期待
	expectedSession := models.Session{
		Type:   "ring",
		BuyIn:  1000,
		Result: 1500,
		Note:   "memo",
	}

	mockR.On("Create", mock.AnythingOfType("*models.Session")).Return(nil)

	session, err := svc.CreateSession(input)

	assert.NoError(t, err)
	assert.Equal(t, expectedSession.Type, session.Type)
	assert.Equal(t, expectedSession.BuyIn, session.BuyIn)
	assert.Equal(t, expectedSession.Result, session.Result)
	mockR.AssertExpectations(t)
}

// --- テスト：異常系（不正値） ---
func TestSessionServiceCreateInvalid(t *testing.T) {
	mockR := new(handlermock.MockSessionRepo)
	svc := service.NewSessionService(mockR)

	input := gen.SessionInput{
		Type:   gen.SessionInputTypeRing,
		BuyIn:  -1,
		Result: 1500,
	}

	_, err := svc.CreateSession(input)

	assert.ErrorIs(t, err, service.ErrInvalidSession)
}

// --- ヘルパー ---
func ptr(s string) *string {
	return &s
}
