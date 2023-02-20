// vérification de l'email avec regex
module.exports = (req, res, next) => {
  const validEmail = (email) => {
    let regEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    let isRegexTrue = regEmail.test(email);

    isRegexTrue ? next() : res.status(400).json({ message: `Le format de l'email est invalide !` })
  }
  validEmail(req.body.email)
};
