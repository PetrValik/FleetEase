const entityDatabase = require("../../database/entityDatabase");

// Příklad funkce pro smazání entity na základě ID
async function DeleteEntity(entityId) {
  try {
    // Kontrola, zda entita existuje
    const entityExists = await entityDatabase.existsById(entityId);
    if (!entityExists) {
      throw new Error(`Entity with ID ${entityId} not found`);
    }

    // Smazání entity z databáze
    await entityDatabase.remove(entityId);

    // Potvrzení smazání
    return { success: true };
  } catch (error) {
    throw new Error(`DeleteEntity Error: ${error.message}`);
  }
}

module.exports = DeleteEntity;
