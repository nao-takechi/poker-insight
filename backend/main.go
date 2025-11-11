package main

import (
  "fmt"
  "log"
  "github.com/gofiber/fiber/v2"
  "gorm.io/driver/postgres"
  "gorm.io/gorm"
)

// モデル定義
type Session struct {
  ID      uint   `json:"id" gorm:"primaryKey"`
  Type    string `json:"type"`
  BuyIn   float64 `json:"buy_in"`
  CashOut float64 `json:"cash_out"`
  Memo    string `json:"memo"`
}

func main() {
  // DSN（接続文字列）
  dsn := "host=localhost user=postgres password=password dbname=poker_insight port=5432 sslmode=disable"

  db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
  if err != nil {
    log.Fatal("❌ データベース接続に失敗しました:", err)
  }

  fmt.Println("✅ データベース接続成功")

  // モデルからテーブル自動生成
  db.AutoMigrate(&Session{})

  app := fiber.New()

  // すべてのセッションを取得
  app.Get("/sessions", func(c *fiber.Ctx) error {
    var sessions []Session
    db.Find(&sessions)
    return c.JSON(sessions)
  })

  // 新しいセッションを追加
  app.Post("/sessions", func(c *fiber.Ctx) error {
    var session Session
    if err := c.BodyParser(&session); err != nil {
      return c.Status(400).JSON(fiber.Map{"error": err.Error()})
    }
    db.Create(&session)
    return c.JSON(session)
  })

  app.Listen(":8080")
}
