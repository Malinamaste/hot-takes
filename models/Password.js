// on appelle 'password-validator'
const passwordValidator = require('password-validator');

// on crée un schéma
const passwordSchema = new passwordValidator();

// on y ajoute nos propriétés
passwordSchema
  .is().min(8) // Longueur min : 8
  .is().max(100) // Longueur max : 100
  .has().uppercase() // Doit avoir au moins une majuscule
  .has().lowercase() // Doit avoir au moins une minuscule
  .has().digits() // Doit avoir au moins un chiffre
  .has().not().spaces() // Ne doit pas avoir d'espace
  .is().not().oneOf(['Passw0rd', 'Password123', "=", "'", "\"", "SELECT", "*", "accounts"]); // Valeurs interdites


// On exporte le modèle 
module.exports = passwordSchema;
