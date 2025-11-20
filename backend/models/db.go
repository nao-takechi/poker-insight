package models

import (
	"log"
	"os"

	"github.com/joho/godotenv"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func ConnectDB() {
	// 1. ローカルだけ .env を読み込む
	if os.Getenv("RAILWAY_ENVIRONMENT") == "" {
		// Railway では RAILWAY_ENVIRONMENT が自動セットされる
		_ = godotenv.Load() // ローカルしか .env が存在しない
	}

	// 2. 本番もローカルも DATABASE_URL だけを使う
	dsn := os.Getenv("DATABASE_URL")
	if dsn == "" {
		log.Fatal("DATABASE_URL is missing")
	}

	// 3. DB 接続
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatalf("failed to connect database: %v", err)
	}

	// 4. AutoMigrate を実行
	if err := db.AutoMigrate(&Session{}); err != nil {
		log.Fatalf("AutoMigrate failed: %v", err)
	}

	DB = db
	log.Println("🔥 Database connected!")
}
