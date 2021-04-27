const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");

// modele pour insere ds BDD
const User = require("../models/userModel");

router.get("/connexion", function (req, res) {
  res.render("connexion");
});

router.get("/inscription", function (req, res) {
  res.render("inscription");
});

router.post("/inscription", function (req, res) {
  // variables pour contenir les données de l'utilisateur quand il s'inscrit
  const { name, email, password, password2 } = req.body;
  let errors = [];

  //verifier si les champs sont bien remplis grâce aux variables déclarées  sinon afficher erreur

  if (!name || !email || !password || !password2) {
    errors.push({ message: "veuillez remplir tous les champs" });
  } // verifier que les mdp sont identiques
  if (password !== password2) {
    errors.push({ message: "Mots de passe pas identiques " });
  }

  // verifier taille du mdp
  if (password.length < 8) {
    errors.push({
      message: "Le mot de passe doit contenir au moins 8 caractères",
    });
  }

  // si il y des erreurs dans le tableau alors il faut les afficher et de garder en même temps les data pour ne pas que le form efface toutes les données
  if (errors.length > 0) {
    res.render("inscription", {
      errors,
      name,
      email,
      password,
      password2,
    });
  } else {
    // quand le formuaire est ok de
    User.findOne({ email: email }).then((user) => {
      // si dans la varibale user il y a un email existant alors c'est un user qui existe déjà dans bdd donc cela renvoie un erreur
      if (user) {
        errors.push({ message: "Email déjà existant" });
        res.render("inscription", {
          errors,
          name,
          email,
          password,
          password2,
        });
      } else {
        const newUser = new User({
          name,
          email,
          password,
        });
        // crypter le mdp

        bcrypt.genSalt(10, (err, salt) =>
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            // mdr crypté
            newUser.password = hash; // mtn le mot de passe n'est plus un text mais il est hashé
            newUser
              .save()
              .then((user) => {
                // ce qui est re transmit au user
                req.flash(
                  "success_msg",
                  "Vous êtes bien enregistré vous pouvez vous connecter !"
                ); // flash est liée a une session elle affiche un message lié a une session après avoir été re dirigé vers la page de co
                res.redirect("/users/connexion");
              })
              .catch((err) => console.log(err));
          })
        );
      }
    });
  }
});

// la route pour se connecter
router.post("/connexion", function (req, res, next) {
  console.log(req.body);
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/users/connexion",
    failureFlash: true,
  })(req, res, next);
});

//deconnexion

router.post("/deconnexion", function (req, res) {
  req.logout();
  req.flash("success_msg", "Vous êtes bien déconnecté");
  res.redirect("/");
});

module.exports = router;
