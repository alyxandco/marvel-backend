const express = require("express");
require("dotenv").config();
const router = express.Router();

const axios = require("axios");

// Import du middleware isAuthenticated
const isAuthenticated = require("../middlewares/isAuthenticated");

router.get("/comics", isAuthenticated, async (req, res) => {
  try {
    // let name = "";
    // if (req.query.name) {
    //   name = req.query.name;
    // }

    //! ou
    const title = req.query.title || "";
    const skip = req.query.skip || "0";
    const limit = req.query.limit || "100";

    const MARVEL = process.env.MARVEL_SECRET_KEY;
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${process.env.MARVEL_SECRET_KEY}&title=${title}&skip=${skip}&limit=${limit}`
    );

    res.json({ message: response.data });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
