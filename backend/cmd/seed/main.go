package main

import (
	"log"
	"os"
	"path/filepath"

	"github.com/joho/godotenv"
	"github.com/nao-takechi/poker-insight/seed"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func main() {
	// .env 読む
	exe, _ := os.Getwd()
	envPath := filepath.Join(exe, ".env")
	if err := godotenv.Load(envPath); err != nil {
		log.Printf("Warning: .env not loaded from %s: %v", envPath, err)
	}

	dsn := os.Getenv("DATABASE_URL")
	if dsn == "" {
		log.Fatal("DATABASE_URL is not set in environment variables")
	}

	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatalf("failed to connect database: %v", err)
	}

	// 全削除
	db.Exec("TRUNCATE TABLE sessions RESTART IDENTITY CASCADE")

	// YAML 読む
	ymlPath := filepath.Join(exe, "seed", "seeds.yaml")
	data, err := seed.LoadSeedData(ymlPath)
	if err != nil {
		log.Fatalf("failed to load seeds.yaml: %v", err)
	}

	for _, y := range data.Sessions {
		s := y.ToModel() 
		db.Create(&s) 
	}

	log.Println("seed completed!")
}
