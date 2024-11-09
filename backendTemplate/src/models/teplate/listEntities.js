const entityDatabase = require("../../database/entityDatabase");

// Příklad funkce pro získání seznamu všech entit
async function ListEntities() {
  try {
    // Načtení seznamu entit z databáze
    const entities = await entityDatabase.list();

    // Vrácení seznamu entit
    return entities;
  } catch (error) {
    throw new Error(`ListEntities Error: ${error.message}`);
  }
}

module.exports = ListEntities;
