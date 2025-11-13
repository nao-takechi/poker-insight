package integration

import (
	"testing"

	"github.com/nao-takechi/poker-insight/models"
	"github.com/nao-takechi/poker-insight/repository"
	"github.com/nao-takechi/poker-insight/tests/integration/testutils"
	"github.com/stretchr/testify/assert"
)

func TestSessionRepositoryCreate(t *testing.T) {
	// Setup
	testDB := testutils.SetupTestDB(t)
	db := testDB.DB
	repo := repository.NewSessionRepository(db)

	// Prepare
	session := &models.Session{
		Type:   "tournament",
		BuyIn:  1000,
		Result: 1500,
	}

	// Execute
	errCreate := repo.Create(session)
	sessions, errFind := repo.FindAll()

	// Verify
	assert.NoError(t, errCreate)
	assert.NoError(t, errFind)
	assert.Len(t, sessions, 1)
	assert.Equal(t, "tournament", string(sessions[0].Type))
}