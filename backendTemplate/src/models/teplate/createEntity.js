const entityDatabase = require("../../database/entityDatabase");

// Příklad funkce pro vytvoření nové entity
async function CreateEntity(entityData) {
  try {
    // Kontrola, zda již entita s tímto názvem neexistuje
    const entityExists = await entityDatabase.exists(entityData.name);
    if (entityExists) {
      throw new Error(`Entity with name ${entityData.name} already exists`);
    }

    // Vytvoření entity v databázi
    const newEntity = await entityDatabase.create(entityData);

    // Vracíme nově vytvořenou entitu
    return newEntity;
  } catch (error) {
    throw new Error(`CreateEntity Error: ${error.message}`);
  }
}

module.exports = CreateEntity;
