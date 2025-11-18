package handlermock

import (
	gen "github.com/nao-takechi/poker-insight/gen"
	"github.com/nao-takechi/poker-insight/models"
)

// --- モックサービス ---
type MockSessionService struct {
	CreateSessionFn  func(gen.SessionInput) (models.Session, error)
	GetAllSessionsFn func() ([]models.Session, error)
}

func (m *MockSessionService) CreateSession(input gen.SessionInput) (models.Session, error) {
	return m.CreateSessionFn(input)
}

func (m *MockSessionService) GetAllSessions() ([]models.Session, error) {
	return m.GetAllSessionsFn()
}
