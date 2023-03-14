require('dotenv').config()
// Import de Mongoose :
const mongooseConnexion = require("./config/db")

// Import de Express :
const express = require('express');
const path = require('path');

// Import des packages de sécurité
const cors = require('cors');
const helmet = require('helmet');

// MongoDB connexion
mongooseConnexion(process.env.MONGODB_URL);

// Import des routes sauces et user
const userRoutes = require('./routes/user');
const saucesRoutes = require('./routes/sauces');

const app = express();

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
