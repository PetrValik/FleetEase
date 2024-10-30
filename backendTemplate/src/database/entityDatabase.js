class EntityDatabase {
    // Metoda pro vytvoření nové entity
    async create(entityData) {
      // Tady se volá databáze pro vytvoření nové entity
      console.log("Tady se volá databáze: Vytváření nové entity", entityData);
  
      // Simulace úspěšné operace
      return { ...entityData, id: "generated-id" };
    }
  
    // Metoda pro smazání entity podle ID
    async remove(entityId) {
      // Tady se volá databáze pro smazání entity s daným ID
      console.log(`Tady se volá databáze: Mazání entity s ID ${entityId}`);
  
      // Simulace úspěšné operace
      return { success: true };
    }
  
    // Metoda pro získání jedné entity podle ID
    async get(entityId) {
      // Tady se volá databáze pro načtení entity s daným ID
      console.log(`Tady se volá databáze: Získání entity s ID ${entityId}`);
  
      // Simulace nalezení entity
      return { id: entityId, name: "Example Entity", description: "Toto je příklad entity" };
    }
  
    // Metoda pro načtení seznamu všech entit
    async list() {
      // Tady se volá databáze pro načtení seznamu entit
      console.log("Tady se volá databáze: Načítání seznamu entit");
  
      // Simulace seznamu entit
      return [
        { id: "1", name: "Entity 1", description: "Popis entity 1" },
        { id: "2", name: "Entity 2", description: "Popis entity 2" },
      ];
    }
  
    // Metoda pro kontrolu existence entity podle názvu
    async exists(entityName) {
      // Tady se volá databáze pro kontrolu existence entity podle názvu
      console.log(`Tady se volá databáze: Kontrola, zda existuje entita s názvem ${entityName}`);
  
      // Simulace kontroly existence (např. entita existuje, pokud se jmenuje "Entity 1")
      return entityName === "Entity 1";
    }
  
    // Metoda pro kontrolu existence entity podle názvu, ale s jiným ID
    async existsWithDifferentId(entityName, entityId) {
      // Tady se volá databáze pro kontrolu, zda existuje entita se stejným názvem, ale jiným ID
      console.log(
        `Tady se volá databáze: Kontrola, zda existuje entita s názvem ${entityName} a jiným ID než ${entityId}`
      );
  
      // Simulace kontroly existence (např. entita existuje, pokud má jiné ID než entityId)
      return entityName === "Entity 1" && entityId !== "1";
    }
  
    // Metoda pro aktualizaci entity
    async update(entityId, updatedData) {
      // Tady se volá databáze pro aktualizaci entity
      console.log(`Tady se volá databáze: Aktualizace entity s ID ${entityId}`, updatedData);
  
      // Simulace aktualizace entity
      return { id: entityId, ...updatedData };
    }
  }
  
  module.exports = new EntityDatabase();
  