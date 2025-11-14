package seed

import (
	"os"
	"time"

	"github.com/nao-takechi/poker-insight/models"
	"gopkg.in/yaml.v3"
)

type SeedData struct {
	Sessions []YmlSession `yaml:"sessions"`
}

// YAML の形式に合わせた中間型（後でモデルに変換する）
type YmlSession struct {
	Type      string    `yaml:"type"`
	BuyIn     int       `yaml:"buyIn"`
	Result    int       `yaml:"result"`
	OtherCost int       `yaml:"otherCost"`
	Note      string    `yaml:"note"`
	CreatedAt time.Time `yaml:"createdAt"`
}

func LoadSeedData(path string) (*SeedData, error) {
	b, err := os.ReadFile(path)
	if err != nil {
		return nil, err
	}

	var data SeedData
	if err := yaml.Unmarshal(b, &data); err != nil {
		return nil, err
	}

	return &data, nil
}

// YAML → GORM モデルへの変換
func (y YmlSession) ToModel() models.Session {
	return models.Session{
		Type:      models.SessionType(y.Type),
		BuyIn:     y.BuyIn,
		Result:    y.Result,
		OtherCost: y.OtherCost,
		Note:      y.Note,
		CreatedAt: y.CreatedAt,
	}
}
