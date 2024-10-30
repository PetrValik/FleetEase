const entityDatabase = require("../../database/entityDatabase");

// Příklad funkce pro aktualizaci entity podle ID
async function UpdateEntity(entityId, updatedData) {
  try {
    // Kontrola, zda entita existuje
    const entity = await entityDatabase.get(entityId);
    if (!entity) {
      throw new Error(`Entity with ID ${entityId} not found`);
    }

    // Kontrola, zda nový název není duplicitní
    if (updatedData.name && updatedData.name !== entity.name) {
      const nameExists = await entityDatabase.exists(updatedData.name);
      if (nameExists) {
        throw new Error(`Entity with name ${updatedData.name} already exists`);
      }
    }

    // Aktualizace entity v databázi
    const updatedEntity = await entityDatabase.update(entityId, updatedData);

    // Vrácení aktualizované entity
    return updatedEntity;
  } catch (error) {
    throw new Error(`UpdateEntity Error: ${error.message}`);
  }
}

module.exports = UpdateEntity;
