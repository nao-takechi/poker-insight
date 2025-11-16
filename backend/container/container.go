package container

import (
	"github.com/nao-takechi/poker-insight/handlers"
	"github.com/nao-takechi/poker-insight/models"
	"github.com/nao-takechi/poker-insight/repository"
	"github.com/nao-takechi/poker-insight/service"
)

type Container struct {
	SessionHandler *handlers.SessionHandler
	StatsHandler   *handlers.StatsHandler
}

func NewContainer() *Container {
	// Repository
	sessionRepo := repository.NewSessionRepository(models.DB)
	statsRepo := repository.NewStatsRepository(models.DB)

	// Service
	sessionSvc := service.NewSessionService(sessionRepo)
	statsSvc := service.NewStatsService(statsRepo)

	// Handler
	sessionHandler := handlers.NewSessionHandler(sessionSvc)
	statsHandler := handlers.NewStatsHandler(statsSvc)

	return &Container{
		SessionHandler: sessionHandler,
		StatsHandler:   statsHandler,
	}
}
