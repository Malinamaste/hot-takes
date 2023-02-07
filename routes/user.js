// on importe express pour créer un router :
const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');

// POST car le frontend va envoyer des infos
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;
