const express = require("express");
require("dotenv").config();
const router = express.Router();

const axios = require("axios");

// Import du middleware isAuthenticated
const isAuthenticated = require("../middlewares/isAuthenticated");

router.get("/character/:characterId", isAuthenticated, async (req, res) => {
  try {
    const charId = req.params.characterId;

    const MARVEL = process.env.MARVEL_SECRET_KEY;

    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/character/${charId}?apiKey=${process.env.MARVEL_SECRET_KEY}`
    );

    console.log(response.data);
    res.json({ message: response.data });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
