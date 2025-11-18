package handlermock

import (
	"github.com/nao-takechi/poker-insight/models"
	"github.com/stretchr/testify/mock"
)

// --- モック定義 ---
type MockSessionRepo struct {
	mock.Mock
}

func (m *MockSessionRepo) Create(session *models.Session) error {
	args := m.Called(session)
	return args.Error(0)
}

func (m *MockSessionRepo) FindAll() ([]models.Session, error) {
	args := m.Called()
	return args.Get(0).([]models.Session), args.Error(1)
}
