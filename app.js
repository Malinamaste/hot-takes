// Import de Express :
const express = require('express');
// Import de Mongoose :
const mongoose = require('mongoose');
const path = require('path');

// Import des packages de sécurité
//const cors = require('cors');
//const helmet = require('helmet');

// Import des routes sauces et user
const saucesRoutes = require('./routes/sauces');
const userRoutes = require('./routes/user');

const app = express();

// Importation de Mongoose :
mongoose.connect('mongodb+srv://malinamaste:niokman4ever@cluster0.g6opnco.mongodb.net/?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


/************************************************************************
                => CORS : Cross Origin Resource Sharing
*************************************************************************/
// Pour permettre des requêtes cross-origin (et empêcher des erreurs CORS), des headers spécifiques de contrôle d'accès doivent être précisés pour tous nos objets de réponse.

// Ces headers qui permettent...
app.use((req, res, next) => {
  // d'accéder à notre API depuis n'importe quelle origine ('*') :
  res.setHeader('Access-Control-Allow-Origin', '*');
  // d'ajouter les headers mentionnés aux requêtes envoyées vers notre API (Origin, X-Requested-With, etc.) :
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  // d'envoyer des requêtes avec les méthodes mentionnées (GET, POST, etc.) :
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});


// Cors
//app.use(cors());
// Extra headers pour plus de sécurité -> routes
//app.use(helmet());

// Transforme les données des requêtes POST en objet JSON
app.use(express.json());

// Routes utilisées
app.use('/api/sauces', saucesRoutes);
app.use('/api/auth', userRoutes);

// Middleware qui permet l'accès statique à des images _dirname = nom du dossier où nous sommes
app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;
