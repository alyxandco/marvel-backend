const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGODB_URI);

const app = express();
app.use(express.json());
app.use(cors());

const userRoutes = require("./routes/user");
const charactersRoutes = require("./routes/characters");
const comicsRoutes = require("./routes/comics");
const comicsbycharacterRoutes = require("./routes/comicsbycharacter");
const characterbyidRoutes = require("./routes/characterbyid");

app.use(userRoutes);
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
