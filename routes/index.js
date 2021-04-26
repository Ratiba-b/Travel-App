const express = require("express");
const router = express.Router();
const { bienConnecte } = require("../config/auth");

router.get("/", function (req, res) {
  res.render("accueil");
});

router.get("/dashboard", bienConnecte, function (req, res) {
  res.render("dashboard", {
    name: req.user.name, // recup le nom de l'user afin de l'afficher dans la vue du dashboard
  });
});

module.exports = router;
