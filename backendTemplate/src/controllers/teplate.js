const express = require("express");
const router = express.Router();

// Import CRUD operací pro obecnou entitu (nahraď <entity> skutečnou entitou)
const GetEntity = require("../models/<entity>/getEntity");
const ListEntities = require("../models/<entity>/listEntities");
const CreateEntity = require("../models/<entity>/createEntity");
const UpdateEntity = require("../models/<entity>/updateEntity");
const DeleteEntity = require("../models/<entity>/deleteEntity");

// Definice jednotlivých cest (routes) s odpovídajícími HTTP metodami

// READ - získání jedné entity
router.get("/get", GetEntity);      

// READ - získání seznamu entit
router.get("/list", ListEntities);  

// CREATE - vytvoření nové entity
router.post("/create", CreateEntity); 

// UPDATE - aktualizace existující entity (PUT pro úplnou aktualizaci, PATCH pro částečnou)
router.put("/update", UpdateEntity); // Úplná aktualizace entity
router.patch("/update", UpdateEntity); // Částečná aktualizace entity

// DELETE - smazání existující entity
router.delete("/delete", DeleteEntity);

// Export routeru pro použití v hlavní aplikaci
module.exports = router;
