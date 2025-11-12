package integration

import (
	"testing"

	"github.com/nao-takechi/poker-insight/models"
	"github.com/nao-takechi/poker-insight/repository"
	"github.com/nao-takechi/poker-insight/tests/integration/testutils"
	"github.com/stretchr/testify/assert"
)

func TestRepository_CreateAndFindAll(t *testing.T) {
	testDB := testutils.SetupTestDB(t)
	db := testDB.DB

	repo := repository.NewSessionRepository(db)

	session := &models.Session{Type: "tournament", BuyIn: 1000, Result: 1500}
	err := repo.Create(session)
	assert.NoError(t, err)

	sessions, err := repo.FindAll()
	assert.NoError(t, err)
	assert.Len(t, sessions, 1)
	assert.Equal(t, "tournament", string(sessions[0].Type))
}
