const express = require("express");
const router = express.Router();
const { bienConnecte } = require("../config/auth");
const Amadeus = require("amadeus");
const { airportList } = require("../config/airports");
const mongoose = require("mongoose");
const Vols = require("../models/volsModel");

require("dotenv").config();

let key = process.env.KEY;
let secret = process.env.SECRET;

var amadeus = new Amadeus({
  clientId: key,
  clientSecret: secret,
});

router.get("/", bienConnecte, function (req, res) {
  res.render("recherches", { airports: airportList() });
});

router.post("/resultats", async function (req, res) {
  console.log(req.body);
  departure = req.body.departure;
  arrival = req.body.arrival;
  locationDeparture = req.body.locationDeparture;
  locationArrival = req.body.locationArrival;

  const amadeusResponse = await amadeus.shopping.flightOffersSearch
    .get({
      originLocationCode: locationDeparture,
      destinationLocationCode: locationArrival,
      departureDate: departure,
      adults: "1",
    })
    .catch((err) => console.log(err));

  let apiResult = []; // va stocker les données à renvoyer au client
  //console.log(JSON.parse(amadeusResponse.body).data);

  const body = JSON.parse(amadeusResponse.body); //transforme la rep d'amadeus en JSON
  if (body.data.length > 0) {
    // si taille < 0 pas de vols dispo

    const carriers = body.dictionaries.carriers; //recup la liste des compagnies qu'on réutilisera plus tard
    const aircraft = body.dictionaries.aircraft; // pareil pour les types d'avions

    // on parcours l'objet renvoyé par amadeus pour recup ce qu'il nous interesse flight est la  key
    body.data.forEach((flight) => {
      const itinerary = flight.itineraries[0]; // rentre dans l'objet data puis dans le tableau des itinéraire et recup tous les objets contenu dans le tableau des  itineraires
      const segments = itinerary.segments; // dans itinéraire on recup le tableau des segments qui contient des objets avec a l'interieur tous les renseignements des vols
      const firstSegment = segments[0]; // dans le tableau segments on recup le premier objet du tableau il correspond au depart du vol
      const lastSegment = segments[segments.length - 1]; // sert a recup le dernier objet du tableau segments afin de toujours avoir l'objet contenant le vol d'arrivé
      const price = flight.price; // recup l'objet contenant les infos liés au prix

      // une fois les infos recupérés on les push dans notre tableau apiResult, il nous servira a afficher les resultats pour notre client
      apiResult.push({
        departure: firstSegment.departure.iataCode, // recup et stock dans departure le code de l'aeroport pour notre vol de départ
        departureDate: firstSegment.departure.at, // recup et stock dans departureDate la date pour notre vol de départ
        arrival: lastSegment.arrival.iataCode, // pareil pour arrivé
        arrivalDate: lastSegment.arrival.at, // pareil pour date arrivée
        finalPrice: price.total,
        currency: price.currency,
        aircraft: aircraft[firstSegment.aircraft.code], // dans les crochets on recup la valeur du code de l'aircraft puis on l'utilise pour trouver le code correspondant dans la liste des aircrafts fourni par amadeus
        carrier: carriers[firstSegment.carrierCode], // pareil pour compagnie
      });
    });
  }
  result = apiResult.slice(0, 4);

  console.log(result);

  try {
    await res.render("resultats", { datas: result }); // envoie le resultat
  } catch (err) {
    await res.json(err);
  }
});
router.get("/resultats", bienConnecte, function (req, res) {
  res.render("resultats");
});

module.exports = router;
