package main

import (
	"log"
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"

	"github.com/nao-takechi/poker-insight/container"
	"github.com/nao-takechi/poker-insight/models"
	"github.com/nao-takechi/poker-insight/router"
)

func main() {
	// DB 接続（Local / Railway 両対応）======
	models.ConnectDB()
	db := models.DB

	// DI コンテナ
	c := container.NewContainer(db)

	// Fiber 起動
	app := fiber.New()
	app.Use(cors.New())

	// ルーティング
	router.SetupRoutes(app, c.SessionHandler, c.StatsHandler)

	// Listen
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080" // local fallback
	}

	log.Println("🚀 Server running on port", port)
	if err := app.Listen(":" + port); err != nil {
		log.Fatalf("Failed to start server: %v", err)
	}
}
