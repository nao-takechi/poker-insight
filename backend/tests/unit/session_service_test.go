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
func TestCreateSession_ValidData(t *testing.T) {
	mockR := new(mockRepo)
	svc := service.NewSessionService(mockR)

	session := &models.Session{BuyIn: 1000, Result: 1500}

	// Repository.Create() が呼ばれることを期待
	mockR.On("Create", session).Return(nil)

	err := svc.CreateSession(session)
	assert.NoError(t, err)
	mockR.AssertExpectations(t)
}

func TestCreateSession_InvalidData(t *testing.T) {
	mockR := new(mockRepo)
	svc := service.NewSessionService(mockR)

	session := &models.Session{BuyIn: -1000, Result: 1500}
	err := svc.CreateSession(session)

	assert.ErrorIs(t, err, service.ErrInvalidSession)
}
