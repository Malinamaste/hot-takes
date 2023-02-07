// Import de Mongoose : 
const mongoose = require('mongoose');

// Schéma de données pour une sauce :
const sauceSchema = mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  manufacturer: { type: String, required: true },
  description: { type: String, required: true },
  mainPepper: { type: String, required: true },
  imageUrl: { type: String, required: true },
  heat: { type: Number, required: true },
  likes: { type: Number, required: false, default: 0 },
  dislikes: { type: Number, required: false, default: 0 },
  usersLiked: { type: Array, required: false },
  usersDisliked: { type: Array, required: false }
});

// On exporte le modèle pour qu'il soit disponible par express
module.exports = mongoose.model('Sauce', sauceSchema);
