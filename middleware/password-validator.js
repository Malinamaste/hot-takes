// on importe le modèle de mot de passe
const passwordSchema = require('../models/Password');

module.exports = (req, res, next) => {
  // si le mdp ne correspond pas au schema
  if (!passwordSchema.validate(req.body.password)) {
    res.writeHead(
      400,
      '{"message": "Votre mot de passe doit comporter au minimum 8 caractères comprenant au moins 1 majuscule, 1 minuscule, 1 chiffre et un caractère spécial, sans espaces "}',
      {'content-type': 'application/json'}
    );
    res.end('Format de mot de passe invalide');
  } else {
    next();
  }
};
