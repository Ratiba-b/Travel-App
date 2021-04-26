const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// sert à l'authentification

// utiliser le user model
const User = require("../models/userModel");

module.exports = function (passport) {
  passport.use(
    new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
      // trouver si les emails correspondent pour se connecter
      User.findOne({ email: email })
        .then((user) => {
          if (!user) {
            return done(null, false, { message: "email non enregistré" }); // null erreur et pas d'email enregistré
          }

          // verifier si mdp correspondent
          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) throw err;

            if (isMatch) {
              return done(null, user); // null pour l'erreur mais user existant
            } else {
              return done(null, false, { message: "mot de passe incorrect !" });
            }
          });
        })
        .catch((err) => console.log(err));
    })
  );

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });
};
/**L'ID utilisateur (que vous fournissez comme deuxième argument de la donefonction) est enregistré dans la session
 * et est ensuite utilisé pour récupérer l'objet entier via la deserializeUserfonction.
 * c'est une sorte de clé qui est lie une session à un user afin de garder un cookie de la session pour rester co?  */
