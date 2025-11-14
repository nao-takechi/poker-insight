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
	// コンテキストを作成
	ctx := context.Background()

	// PostgreSQL コンテナを起動
	pgContainer, err := tcpostgres.Run(ctx,
		"postgres:16",
		tcpostgres.WithDatabase("testdb"),
		tcpostgres.WithUsername("user"),
		tcpostgres.WithPassword("password"),
	)
	assert.NoError(t, err, "Postgres コンテナの起動に失敗しました")

	// 接続文字列を取得
	connStr, err := pgContainer.ConnectionString(ctx, "sslmode=disable")
	assert.NoError(t, err, "接続文字列の取得に失敗しました")

	// Postgres の起動完了を待機（最大10回リトライ）
	var db *gorm.DB
	for range [10]struct{}{} {
		db, err = gorm.Open(gormpg.Open(connStr), &gorm.Config{
			Logger: logger.Default.LogMode(logger.Silent), // ログ出力を抑制
		})
		if err == nil {
			break
		}
		time.Sleep(time.Second)
	}
	assert.NoError(t, err, "Postgres が起動しませんでした（10秒経過）")

	// モデルのマイグレーションを実行
	err = db.AutoMigrate(&models.Session{})
	assert.NoError(t, err, "AutoMigrate に失敗しました")

	// テスト終了時にコンテナを停止
	t.Cleanup(func() {
		_ = pgContainer.Terminate(ctx)
	})

	// テスト用 DB ハンドルを返す
	return &TestDB{
		DB:         db,
		Container:  pgContainer,
		CleanupCtx: ctx,
	}
}
