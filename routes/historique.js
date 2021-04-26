const express = require("express");
const router = express.Router();
const Vol = require("../models/volsModel");
const { bienConnecte } = require("../config/auth");

router.get("/", bienConnecte, function (req, res) {
  Vol.find({ userId: req.user._id }, function (err, data) {
    if (err) throw err;

    res.render("historique", { vols: data });
  });
});

router.post("/", function (req, res) {
  console.log(req.body);
  const newFlight = new Vol({
    userId: req.user._id,

    departure: req.body.departure,
    departureDate: req.body.departureDate,
    arrival: req.body.arrival,
    arrivalDate: req.body.arrivalDate,
    finalPrice: req.body.finalPrice,
    currency: req.body.currency,
    aircraft: req.body.aircraft,
    carrier: req.body.carrier,
  });

  newFlight.save((err, flight) => {
    if (err) {
      res.send(err);
    } else {
      console.log("redirecting");
      res.redirect("/historique");
    }
  });
});

router.delete("/:id", function (req, res) {
  //effacer les données selectionnées de la BDD
  Vol.findOneAndRemove({ _id: req.params.id }, function (err, data) {
    if (err) {
      res.send(err);
    }
    res.render("historique", { vols: data });
  });
});
module.exports = router;
