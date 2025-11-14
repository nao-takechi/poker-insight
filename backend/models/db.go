package models

import (
	"fmt"
	"log"
	"os"

	"github.com/joho/godotenv"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func ConnectDB() {
	// .envを読み込む
	err := godotenv.Load()
	if err != nil {
		log.Println(".envファイルが見つかりません")
	}
	// 環境変数を取得
	host := os.Getenv("POSTGRES_HOST")
	user := os.Getenv("POSTGRES_USER")
	password := os.Getenv("POSTGRES_PASSWORD")
	dbname := os.Getenv("POSTGRES_DB")
	port := os.Getenv("POSTGRES_PORT")

	// DSNを動的に構築
	dsn := fmt.Sprintf(
		"host=%s user=%s password=%s dbname=%s port=%s sslmode=disable",
		host, user, password, dbname, port,
	)
	// DB接続
	database, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal("DB connection failed:", err)
	}
	// マイグレーション
	if err := database.AutoMigrate(&Session{}); err != nil {
		log.Fatalf("AutoMigrate failed: %v", err)
	}
	DB = database
	log.Println("✅ Database connected successfully!")
}
