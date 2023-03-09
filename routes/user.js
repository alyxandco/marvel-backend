const express = require("express");
const router = express.Router();

require("dotenv").config();

const uid2 = require("uid2");
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");

const User = require("../models/User");

// Route SIGNUP

router.post("/user/signup", async (req, res) => {
  try {
    //Password
    const password = req.body.password;
    //salt
    const salt = uid2(16);
    //Hash
    const hash = SHA256(salt + password).toString(encBase64);
    //Token
    const token = uid2(64);

    // enregistrement en BDD (sauf password) et réponse au client (sauf salt et hash)
    const { username, email } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json("Missing parameter");
    }
    const emailToVerify = await User.findOne({ email: email });
    if (emailToVerify) {
      return res.status(400).json("This email already has an account");
    }
    const newUser = new User({
      username: username,
      email: email,
      salt: salt,
      hash: hash,
      token: token,
    });

    await newUser.save();
    res.json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Route LOGIN
router.post("/user/login", async (req, res) => {
  if (!req.body.password || !req.body.email) {
    return res.status(401).json({ message: "Missing parameter" });
  }
  try {
    const password = req.body.password;
    const email = req.body.email;
    // Aller chercher dans la BDD l'utilisateur dont l'email est celui reçu.
    const userToVerify = await User.findOne({ email: email });
    if (!userToVerify) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    // génération d'un hash avec le salt du user trouvé en BDD + le password transmis en req.body
    const newHash = SHA256(userToVerify.salt + password).toString(encBase64);
    // comparaison du nouveau newHash avec celui enregistré en BDD pour le user
    if (newHash === userToVerify.hash) {
      return res.json({
        _id: userToVerify._id,
        token: userToVerify.token,
        username: userToVerify.username,
      });
    } else {
      return res.json("utilisateur et/ou mot de passe inconnu");
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
