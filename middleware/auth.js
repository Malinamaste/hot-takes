const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    // on récupère le token via le header authorization
    const token = req.headers.authorization.split(' ')[1];
    // on décode le token avec verify() de jwt
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    // on récupère le userId via le decodedToken
    const userId = decodedToken.userId;
    // on ajoute cette valeur à l'objet request qui sera transmit aux routes appelées par la suite
    /*req.auth = {
      userId: userId
    };
    next();*/
    if (req.body.userId && req.body.userId !== userId) {
      throw 'Identifiant invalide';
    } else {
      next();
    }
  } catch (error) {
    res.status(401).json({ error });
  }
};
