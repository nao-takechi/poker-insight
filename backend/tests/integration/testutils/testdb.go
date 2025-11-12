package testutils

import (
	"context"
	"testing"
	"time"

	"github.com/nao-takechi/poker-insight/models"
	"github.com/stretchr/testify/assert"
	tcpostgres "github.com/testcontainers/testcontainers-go/modules/postgres"
	gormpg "gorm.io/driver/postgres"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

type TestDB struct {
	DB         *gorm.DB
	Container  *tcpostgres.PostgresContainer
	CleanupCtx context.Context
}

func SetupTestDB(t *testing.T) *TestDB {
	ctx := context.Background()

	pgContainer, err := tcpostgres.Run(ctx,
		"postgres:16",
		tcpostgres.WithDatabase("testdb"),
		tcpostgres.WithUsername("user"),
		tcpostgres.WithPassword("password"),
	)
	assert.NoError(t, err)

	connStr, err := pgContainer.ConnectionString(ctx, "sslmode=disable")
	assert.NoError(t, err)

	// Postgres起動待ちリトライ
	var db *gorm.DB
	for range [10]struct{}{} {
		db, err = gorm.Open(gormpg.Open(connStr), &gorm.Config{
			Logger: logger.Default.LogMode(logger.Silent), 
		})
		if err == nil {
			break
		}
		time.Sleep(time.Second)
	}
	assert.NoError(t, err, "Postgresが起動しませんでした（10秒経過）")

	err = db.AutoMigrate(&models.Session{})
	assert.NoError(t, err)

	t.Cleanup(func() {
		_ = pgContainer.Terminate(ctx)
	})

	return &TestDB{
		DB:         db,
		Container:  pgContainer,
		CleanupCtx: ctx,
	}
}
