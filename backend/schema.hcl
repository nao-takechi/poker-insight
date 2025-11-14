table "sessions" {
  schema = schema.public
  column "id" {
    null = false
    type = bigserial
  }
  column "type" {
    null = true
    type = text
  }
  column "buy_in" {
    null = true
    type = bigint
  }
  column "cash_out" {
    null = true
    type = numeric
  }
  column "memo" {
    null = true
    type = text
  }
  column "result" {
    null = true
    type = bigint
  }
  column "other_cost" {
    null = true
    type = bigint
  }
  column "note" {
    null = true
    type = text
  }
  column "created_at" {
    null = true
    type = timestamptz
  }
  primary_key {
    columns = [column.id]
  }
}
schema "public" {
  comment = "standard public schema"
}
