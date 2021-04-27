const express = require("express");
const app = express();
const mongoose = require("mongoose");
const flash = require("connect-flash");
const session = require("express-session");
const cookieSession = require("cookie-session");
const passport = require("passport");
const { bienConnecte } = require("./config/auth");
const morgan = require("morgan");
require("dotenv").config;

//appeler le fichier passport
require("./config/passport")(passport);

app.use(express.static("assets"));

//connect db
const db = require("./config/keys").MongoURI;

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("connecte a la base de donnees"))
  .catch((err) => console.error(err));

// BODY PARSER
app.use(express.urlencoded({ extended: false }));

// passport middleware toujours placer derriere session

app.use(
  cookieSession({
    name: "session",
    keys: ["key1"],
  })
);
app.use(passport.initialize());
app.use(passport.session());

//connexion au flash
app.use(flash());

// globales variables pour distinguer les différentes types d'erreurs avec différentes couleurs
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error"); // flash pour passport connexion
  next();
});

app.use("/static", express.static("assets"));
app.set("view engine", "ejs");
app.use(express.json());

//routes

app.use("/", require("./routes/index")); // page accueil
app.use("/users", require("./routes/users")); // inscription login et logout
app.use("/recherches", bienConnecte, require("./routes/resultats"));
app.use("/todo", bienConnecte, require("./routes/todo"));
app.use("/historique", bienConnecte, require("./routes/historique"));

app.use(morgan("dev"));

app.listen(process.env.PORT || 3000);
