const entityDatabase = require("../../database/entityDatabase");

// Příklad funkce pro získání jedné entity podle ID
async function GetEntity(entityId) {
  try {
    // Načtení entity z databáze
    const entity = await entityDatabase.get(entityId);
    if (!entity) {
      throw new Error(`Entity with ID ${entityId} not found`);
    }

    // Vrácení entity
    return entity;
  } catch (error) {
    throw new Error(`GetEntity Error: ${error.message}`);
  }
}

module.exports = GetEntity;
