// sert a protger l'acces aux pages. Si on est pas connecté impossible d'acceder à une page 

module.exports = {
    bienConnecte: function(req, res, next) {
        if(req.isAuthenticated()) {
            return next();
        }
        req.flash('error_msg', 'Vous devez vous connecter pour accéder à cette page ');
        res.redirect('/users/connexion/');
    }
}