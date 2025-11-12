package service

import (
	"github.com/nao-takechi/poker-insight/models"
	"github.com/nao-takechi/poker-insight/repository"
)

type SessionService interface {
	CreateSession(session *models.Session) error
	GetAllSessions() ([]models.Session, error)
}

type sessionService struct {
	repo repository.SessionRepository
}

func NewSessionService(repo repository.SessionRepository) SessionService {
	return &sessionService{repo: repo}
}

func (s *sessionService) CreateSession(session *models.Session) error {
	// ビジネスロジック（例: 値の整合性チェックなど）
	if session.BuyIn < 0 || session.Result < 0 {
		return ErrInvalidSession
	}
	return s.repo.Create(session)
}

func (s *sessionService) GetAllSessions() ([]models.Session, error) {
	return s.repo.FindAll()
}
