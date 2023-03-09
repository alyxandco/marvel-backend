const express = require("express");
require("dotenv").config();
const router = express.Router();

const axios = require("axios");

router.get("/comics/:characterId", async (req, res) => {
  try {
    const Id = req.params.characterId;
    const MARVEL = process.env.MARVEL_SECRET_KEY;

    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics/${Id}?apiKey=${process.env.MARVEL_SECRET_KEY}`
    );

    res.json({ message: response.data });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
