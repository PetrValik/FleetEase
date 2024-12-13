const express = require("express");
const router = express.Router();
const supabase = require("../database/supabase");

// Endpoint pro získání všech zemí
router.get("/", async (req, res) => {
  try {
    const { data, error } = await supabase.from("Countries").select("*");
    if (error) throw error;
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching countries:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// Endpoint pro získání země podle jejího ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase
      .from("Countries")
      .select("*")
      .eq("country_id", id)
      .single();
    if (error) throw error;
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching country by ID:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// Endpoint pro přidání nové země
router.post("/", async (req, res) => {
  try {
    const { country_name, alpha_2, alpha_3, numeric } = req.body;
    const { data, error } = await supabase.from("Countries").insert([
      {
        country_name,
        alpha_2,
        alpha_3,
        numeric,
      },
    ]);
    if (error) throw error;
    res.status(201).json(data);
  } catch (error) {
    console.error("Error adding country:", error.message);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
