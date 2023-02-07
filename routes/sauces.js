// on importe express :
const express = require('express');

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const router = express.Router();

// On importe notre Controller Sauce :
const saucesCtrl = require('../controllers/sauces');

/******************************************************************
          Récupération de la liste de toutes les sauces
******************************************************************/
router.get('/', auth, saucesCtrl.getAllSauces);

/******************************************************************
        Enregistrement d'une sauce dans la base de données
******************************************************************/
router.post('/', auth, multer, saucesCtrl.createSauce);

/******************************************************
          Récupération d'une sauce spécifique
******************************************************/
router.get('/:id', auth, saucesCtrl.getOneSauce);

/******************************************************
          Mettre à jour une sauce existante
******************************************************/
router.put('/:id', auth, multer, saucesCtrl.modifySauce);

/*************************************************
          Liker ou Disliker une sauce
*************************************************/
router.post('/:id/like', auth, saucesCtrl.likesAndDislikes);

/******************************************
          Suppression d'une sauce
******************************************/
router.delete('/:id', auth, saucesCtrl.deleteSauce);

// On exporte le router de ce fichier :
module.exports = router;
