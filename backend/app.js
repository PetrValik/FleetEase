const express = require("express");
const cors = require("cors");
const app = express();
const port = 3001;

// Jednotlivé controllery budou nahrány sem
//const userController = require("./src/controllers/user"); 

// Middleware pro zpracování JSON a url-encoded dat
app.use(express.json()); // podpora pro application/json
app.use(express.urlencoded({ extended: true })); // podpora pro application/x-www-form-urlencoded

// Povolení CORS pro všechny domény
app.use(cors());

// Základní route na kontrolu, zda server běží
app.get("/", (req, res) => {
  try {
    res.status(200).send("We started successfully!");
  } catch (error) {
    res.status(500).send("Server encountered an error.");
  }
});

// Zde se jednotlivé controllery aktivují a přidají do kódu
// app.use("/user", userController); Aktivujeme controller pro uživatele

// Spuštění serveru a naslouchání na daném portu
app.listen(port, () => {
  console.log(`Fleetease app listening on port ${port}`);
});