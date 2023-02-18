const express = require("express");
require("dotenv").config();
const router = express.Router();

const axios = require("axios");

router.get("/characters", async (req, res) => {
  try {
    // let name = "";
    // if (req.query.name) {
    //   name = req.query.name;
    // }

    //! ou
    const name = req.query.name || "";
    const skip = req.query.skip || "0";
    const limit = req.query.limit || "100";

    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${process.env.MARVEL_SECRET_KEY}&name=${name}&skip=${skip}&limit=${limit}`
    );
    console.log(response.data);
    res.json({ message: response.data });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
