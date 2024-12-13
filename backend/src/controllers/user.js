const express = require("express");
const router = express.Router();
const supabase = require("../database/supabase");

// Endpoint pro získání všech uživatelů
router.get("/", async (req, res) => {
  try {
    const { data, error } = await supabase.from("Users").select("*");
    if (error) throw error;
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching users:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// Endpoint pro vytvoření nového uživatele
router.post("/", async (req, res) => {
  try {
    const { email, first_name, last_name } = req.body;
    const { data, error } = await supabase.from("Users").insert([
      { email, first_name, last_name },
    ]);
    if (error) throw error;
    res.status(201).json(data);
  } catch (error) {
    console.error("Error creating user:", error.message);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
