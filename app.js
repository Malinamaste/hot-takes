// Import de Express :
const express = require('express');
// Import de Mongoose :
const mongoose = require('mongoose');
const path = require('path');

// Import des packages de sécurité
const cors = require('cors');
const helmet = require('helmet');

// Import des routes sauces et user
const userRoutes = require('./routes/user');
const saucesRoutes = require('./routes/sauces');

const app = express();

// Importation de Mongoose :
mongoose.connect('mongodb+srv://malinamaste:niokman4ever@cluster0.g6opnco.mongodb.net/?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


// Cors
app.use(cors());
// Extra headers pour plus de sécurité -> routes
app.use(helmet({ crossOriginResourcePolicy: false }));


// Transforme les données des requêtes POST en objet JSON
app.use(express.json());

// Routes utilisées
app.use('/api/sauces', saucesRoutes);
app.use('/api/auth', userRoutes);

// Middleware qui permet l'accès statique à des images _dirname = nom du dossier où nous sommes
app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;
