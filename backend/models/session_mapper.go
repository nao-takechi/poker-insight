package models

import (
	"time"

	gen "github.com/nao-takechi/poker-insight/gen"
)

// -----------------------------
// 🔵 API → DB (POST の入力)
// -----------------------------
func FromAPISessionInput(input gen.SessionInput) Session {
	// createdAt が string の場合はパース
	var createdAt time.Time
	if input.CreatedAt != nil {
		parsed, err := time.Parse(time.RFC3339, *input.CreatedAt)
		if err == nil {
			createdAt = parsed
		} else {
			createdAt = time.Now()
		}
	} else {
		createdAt = time.Now()
	}

	return Session{
		Type:      string(input.Type),
		BuyIn:     input.BuyIn,
		Result:    input.Result,
		OtherCost: ptrIntToValue(input.OtherCost),
		Note:      ptrStringToValue(input.Note),
		CreatedAt: createdAt,
	}
}

// -----------------------------
// 🔵 DB → API (GET 単体)
// -----------------------------
func ToAPISession(m Session) gen.SessionResponse {
	return gen.SessionResponse{
		Id:        int(m.ID),
		Type:      gen.SessionResponseType(m.Type),
		BuyIn:     m.BuyIn,
		Result:    m.Result,
		OtherCost: valueToPtrInt(m.OtherCost),
		Note:      valueToPtrString(m.Note),
		CreatedAt: m.CreatedAt,
	}
}

// -----------------------------
// 🔵 DB → API (GET 複数件)
// -----------------------------
func ToAPISessionList(list []Session) gen.SessionList {
    result := make(gen.SessionList, len(list))

    for i, m := range list {
        result[i] = struct {
            BuyIn     int                 `json:"buyIn"`
            CreatedAt time.Time           `json:"createdAt"`
            Id        int                 `json:"id"`
            Note      *string             `json:"note,omitempty"`
            OtherCost *int                `json:"otherCost,omitempty"`
            Result    int                 `json:"result"`
            Type      gen.SessionResponseType `json:"type"`
        }{
            Id:        int(m.ID),
            Type:      gen.SessionResponseType(m.Type),
            BuyIn:     m.BuyIn,
            Result:    m.Result,
            OtherCost: valueToPtrInt(m.OtherCost),
            Note:      valueToPtrString(m.Note),
            CreatedAt: m.CreatedAt,
        }
    }

    return result
}


// -----------------------------
// 🔧 utility
// -----------------------------

func ptrIntToValue(i *int) int {
	if i == nil {
		return 0
	}
	return *i
}

func ptrStringToValue(s *string) string {
	if s == nil {
		return ""
	}
	return *s
}

func valueToPtrInt(i int) *int {
	if i == 0 {
		return nil
	}
	return &i
}

func valueToPtrString(s string) *string {
	if s == "" {
		return nil
	}
	return &s
}
