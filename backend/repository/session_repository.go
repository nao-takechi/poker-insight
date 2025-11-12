package repository

import (
	"github.com/nao-takechi/poker-insight/models"
	"gorm.io/gorm"
)

type SessionRepository interface {
	Create(session *models.Session) error
	FindAll() ([]models.Session, error)
}

type sessionRepository struct {
	db *gorm.DB
}

func NewSessionRepository(db *gorm.DB) SessionRepository {
	return &sessionRepository{db: db}
}

func (r *sessionRepository) Create(session *models.Session) error {
	return r.db.Create(session).Error
}

func (r *sessionRepository) FindAll() ([]models.Session, error) {
	var sessions []models.Session
	err := r.db.Find(&sessions).Error
	return sessions, err
}