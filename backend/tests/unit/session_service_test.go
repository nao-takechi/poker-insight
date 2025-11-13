package unit

import (
	"testing"

	"github.com/nao-takechi/poker-insight/models"
	"github.com/nao-takechi/poker-insight/service"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/mock"
)

// --- モック定義 ---
type mockRepo struct {
	mock.Mock
}

func (m *mockRepo) Create(session *models.Session) error {
	args := m.Called(session)
	return args.Error(0)
}

func (m *mockRepo) FindAll() ([]models.Session, error) {
	args := m.Called()
	return args.Get(0).([]models.Session), args.Error(1)
}

// --- テスト ---
func TestSessionServiceCreateValid(t *testing.T) {
	// Setup
	mockR := new(mockRepo)
	svc := service.NewSessionService(mockR)

	// Prepare
	session := &models.Session{BuyIn: 1000, Result: 1500}
	mockR.On("Create", session).Return(nil)

	// Execute
	err := svc.CreateSession(session)

	// Verify
	assert.NoError(t, err)
	mockR.AssertExpectations(t)
}

func TestSessionServiceCreateInvalid(t *testing.T) {
	// Setup
	mockR := new(mockRepo)
	svc := service.NewSessionService(mockR)

	// Prepare
	session := &models.Session{BuyIn: -1000, Result: 1500}

	// Execute
	err := svc.CreateSession(session)

	// Verify
	assert.ErrorIs(t, err, service.ErrInvalidSession)
}