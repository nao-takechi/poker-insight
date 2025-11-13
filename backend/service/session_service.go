package service

import (
	gen "github.com/nao-takechi/poker-insight/gen"
	"github.com/nao-takechi/poker-insight/models"
	"github.com/nao-takechi/poker-insight/repository"
)

type SessionService interface {
	CreateSession(input gen.SessionInput) (models.Session, error)
	GetAllSessions() ([]models.Session, error)
}

type sessionService struct {
	repo repository.SessionRepository
}

func NewSessionService(repo repository.SessionRepository) SessionService {
	return &sessionService{repo: repo}
}

func (s *sessionService) CreateSession(input gen.SessionInput) (models.Session, error) {

	// API → DB モデル変換
	session := models.FromAPISessionInput(input)

	// ビジネスロジック
	if session.BuyIn < 0 || session.Result < 0 {
		return session, ErrInvalidSession
	}

	// DB 保存
	err := s.repo.Create(&session)
	return session, err
}

func (s *sessionService) GetAllSessions() ([]models.Session, error) {
	return s.repo.FindAll()
}
