# 🎯 Poker Insight — ポーカーセッション分析アプリ

Poker Insight は、ポーカーのセッション記録・勝率分析・月次収支の可視化を行う  
フルスタック構成のポートフォリオアプリです。

- Backend：Go（Fiber / GORM / PostgreSQL）
- Frontend：Next.js 16（React 19 / TypeScript 5.9）

型の一貫性・テスト容易性・保守性を重視し、実務レベルのアーキテクチャを意識しています。

# 🛠 Setup

## 前提環境

- Docker Desktop
- Node.js 19+
- Go 1.25+

## Backend

```bash
cd backend
cp .env.example .env
docker compose up -d
go run main.go
```

## Frontend

```bash
cd frontend
cp .env.example .env.local
npm install
npm run dev
```

# 🚀 Features

- セッションの登録（タイプ / バイイン / 収支 / メモ）
- 最近のセッション一覧
- 勝率 / 平均収支 / 総収支の算出
- 月次収支の可視化
- Zod → OpenAPI → oapi-codegen による FE/BE 型共有
- FE/BE の Unit / Integration / E2E テスト完備

# 🧱 Architecture

```
Next.js (App Router)
   │
   │ fetch
   ▼
Go API (Fiber)
   │
   │ GORM
   ▼
PostgreSQL

Frontend → Vercel
Backend  → Railway
```

# 🔍 技術的こだわり

## 1. FE/BE の完全な型共有

- Zod スキーマを単一の真実源（Single Source of Truth）として利用
- OpenAPI に変換 → oapi-codegen で Go の型生成
- スキーマ変更がフロント/バック双方に自動で伝播  
  → 「型のズレ」の発生を構造的に防止

## 2. Go の 3 層構造（repository / service / handler）

- repository：DB アクセス
- service：ユースケース・ビジネスロジック
- handler：HTTP インターフェース

→ 責務が明確で、テストが書きやすく、変更に強い。

## 3. Next.js の責務分離

- components：UI ピュアコンポーネント
- hooks：状態管理
- features：機能単位のロジック
- api：fetch ラッパ

→ 大規模化しても破綻しない構造。

## 4. テストフレームワークやツールによる自動テスト

### Frontend

- Jest：custom hooks のユニットテスト
- React Testing Library：UI の描画・イベント検証
- MSW：API モックで結合テスト
- Playwright：実ブラウザでの E2E テスト

### Backend

- Go testing：サービスロジックのテスト
- Testify（mock/assert）
- httptest：ハンドラの HTTP テスト
- Testcontainers：実 PostgreSQL で統合テスト

→ 実務レベルの品質保証構造を意識。

# 📦 Tech Stack

## Frontend

- Next.js 16
- React 18
- TypeScript
- Tailwind CSS
- Zod
- MSW / React Testing Library / Playwright

## Backend

- Go 1.22
- Fiber
- GORM
- PostgreSQL
- oapi-codegen

## Dev / Infra

- Docker / docker-compose
- GitHub Actions（CI）
- Vercel（Frontend）
- Railway（Backend）

# 🗺 Roadmap

- 詳細な統計画面
- セッションの編集・削除
- AI と対話型の傾向フィードバック機能
- 公開用プレイヤープロフィール（SSR・SEO 対策）

# 📬 Contact

質問・フィードバック大歓迎です！
