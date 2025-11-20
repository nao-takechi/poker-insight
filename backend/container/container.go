package container

import (
	"gorm.io/gorm"

	"github.com/nao-takechi/poker-insight/handlers"
	"github.com/nao-takechi/poker-insight/repository"
	"github.com/nao-takechi/poker-insight/service"
)

type Container struct {
    SessionHandler *handlers.SessionHandler
    StatsHandler   *handlers.StatsHandler
}

func NewContainer(db *gorm.DB) *Container {
    // Repository
    sessionRepo := repository.NewSessionRepository(db)
    statsRepo := repository.NewStatsRepository(db)

    // Service
    sessionService := service.NewSessionService(sessionRepo)
    statsService := service.NewStatsService(statsRepo)

    // Handler
    sessionHandler := handlers.NewSessionHandler(sessionService)
    statsHandler := handlers.NewStatsHandler(statsService)

    return &Container{
        SessionHandler: sessionHandler,
        StatsHandler:   statsHandler,
    }
}
