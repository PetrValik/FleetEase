const express = require("express");
const cors = require("cors");
const app = express();
const port = 3001;

// Import controllerů
const userController = require("./src/controllers/user");
const countriesController = require("./src/controllers/countries");

// Middleware pro JSON a CORS
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Základní testovací route
app.get("/", (req, res) => {
  res.status(200).send("We started successfully!");
});

// Aktivace controllerů
app.use("/user", userController);
app.use("/countries", countriesController);

// Spuštění serveru
app.listen(port, () => {
  console.log(`Fleetease app listening on port ${port}`);
});
