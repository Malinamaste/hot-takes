// on appelle 'password-validator'
const passwordValidator = require('password-validator');

// on crée un schéma
const passwordSchema = new passwordValidator();

// on y ajoute nos propriétés
passwordSchema
  .is().min(8) // Longueur min : 8
  .is().max(30) // Longueur max : 30
  .has().uppercase(1) // Doit avoir au moins une majuscule
  .has().lowercase(1) // Doit avoir au moins une minuscule
  .has().digits(1) // Doit avoir au moins un chiffre
  .has().not().spaces() // Ne doit pas avoir d'espace
  .has().symbols(1) // Doit avoir au moins un symbole
  .is().not().oneOf(['Passw0rd', 'Password123', '12345678910', "=", "'", "\"", "SELECT", "*", "accounts"]); // Valeurs interdites

// On exporte le modèle 
module.exports = passwordSchema;
