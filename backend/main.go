package main

import (
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"

	"github.com/nao-takechi/poker-insight/container"
	"github.com/nao-takechi/poker-insight/models"
	"github.com/nao-takechi/poker-insight/router"
)

func main() {
	// DB接続
	models.ConnectDB()

	// DI コンテナを生成
	c := container.NewContainer()

	// Fiber 初期化
	app := fiber.New()
	app.Use(cors.New())

	// ルーティング
	router.SetupRoutes(app, c.SessionHandler, c.StatsHandler)

	// 起動
	if err := app.Listen(":8080"); err != nil {
		log.Fatal(err)
	}
}
