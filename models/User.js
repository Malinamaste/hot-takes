// Import de Mongoose : 
const mongoose = require('mongoose');
// Gère les erreurs pouvant être générées par MongoDB :
const uniqueValidator = require('mongoose-unique-validator');

// Schéma de données d'un utilisateur :
const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
