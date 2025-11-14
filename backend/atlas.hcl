env "local" {
  url = getenv("DB_URL")
  migration {
    dir = "file://migrations"
  }
}