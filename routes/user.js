// on importe express pour créer un router :
const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');
const validPassword = require('../middleware/password-validator');
const validEmail = require('../middleware/valid-email');

// POST car le frontend va envoyer des infos
router.post('/signup', validPassword, validEmail, userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;
