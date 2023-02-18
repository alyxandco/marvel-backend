const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
app.use(cors());
app.use(express.json());

const charactersRoutes = require("./routes/characters");
const comicsRoutes = require("./routes/comics");
const comicsbycharacterRoutes = require("./routes/comicsbycharacter");
const characterbyidRoutes = require("./routes/characterbyid");
app.use(charactersRoutes);
app.use(comicsRoutes);
app.use(comicsbycharacterRoutes);
app.use(characterbyidRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Marvel World 🤡" });
});

app.all("*", (req, res) => {
  res.status(404).json({ message: "This route doesn't exist" });
});

app.listen(process.env.PORT || 4000, () => {
  console.log("Server has started 🔥🔥🔥");
});
