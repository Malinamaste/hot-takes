// On importe notre modèle Sauce car on l'utilise ici :
const Sauce = require('../models/Sauce');
const fs = require('fs');

// Pour créer une sauce :
exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);
  const { name, heat, description, mainPepper, manufacturer } = sauceObject;
  delete sauceObject._id;
  delete sauceObject.userId;

  const sauce = new Sauce({
    userId: req.auth.userId,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    name,
    description,
    heat,
    mainPepper,
    manufacturer
  });

  sauce.save()
    .then(() => {
      res.status(201).json({ message: 'Sauce enregistrée !' })
    })
    .catch((error) => {
      res.status(400).json({ error })
    });
};

// Pour modifier une sauce :
exports.modifySauce = (req, res, next) => {
  const sauceObject = req.file ? {
    ...JSON.parse(req.body.sauce),
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  } : { ...req.body };

  delete sauceObject._userId;
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      if (sauce.userId != req.auth.userId) {
        res.status(403).json({ message: 'Unauthorized request !' });
      } else {
        Sauce.updateOne(
          { _id: req.params.id },
          { ...sauceObject, _id: req.params.id }
        )
          .then(() => res.status(200).json({ message: 'Sauce modifiée !' }))
          .catch(error => res.status(401).json({ error }));
      }
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

// Pour supprimer une sauce :
exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then(sauce => {
      if (sauce.userId != req.auth.userId) {
        res.status(403).json({ message: 'Unauthorized request !' });
      } else {
        const filename = sauce.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
          Sauce.deleteOne({ _id: req.params.id })
            .then(() => {
              res.status(200).json({ message: 'Sauce supprimée !' });
            })
            .catch(error => res.status(401).json({ error }));
        });
      }
    })
    .catch(error => {
      res.status(500).json({ error });
    });
};

// Pour afficher une sauce :
exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(404).json({ error }));
};

// Pour afficher toutes les sauces :
exports.getAllSauces = (req, res, next) => {
  Sauce.find()
    .then(sauces => res.status(200).json(sauces))
    .catch(error => res.status(400).json({ error }));
};

// Pour les likes & dislikes :
exports.likesAndDislikes = (req, res, next) => {

  if (req.body.like === 1) { // Si l'utilisateur aime une sauce

    // On cible la sauce en question via son Id
    Sauce.findOne({ _id: req.params.id })
      .then((sauce) => {
        // Si l'utilisateur ne fait pas déjà parti de ceux qui aiment cette sauce
        if (!sauce.usersLiked.includes(req.auth.userId)) {
          Sauce.updateOne(
            { _id: req.params.id },
            { $inc: { likes: 1 }, $push: { usersLiked: req.auth.userId } }
          )
            .then(() => res.status(200).json({ message: "Vous aimez cette sauce !" }))
            .catch((error) => res.status(400).json({ error }));
        }
      })
      .catch((error) => res.status(400).json({ error }));
  } else if (req.body.like === -1) { // Si l'utilisateur n'aime pas une sauce

    Sauce.findOne({ _id: req.params.id })
      .then((sauce) => {
        if (!sauce.usersDisliked.includes(req.auth.userId)) {
          Sauce.updateOne(
            { _id: req.params.id },
            { $inc: { dislikes: 1 }, $push: { usersDisliked: req.auth.userId } }
          )
            .then(() => res.status(200).json({ message: "Vous n'aimez pas cette sauce !" }))
            .catch((error) => res.status(400).json({ error }));
        }
      })
      .catch((error) => res.status(400).json({ error }));
  } else { // Si l'utilisateur s'est déjà prononcé et qu'il annule son choix (=== 0)

    Sauce.findOne({ _id: req.params.id })
      .then((sauce) => {
        if (sauce.usersLiked.includes(req.auth.userId)) {
          Sauce.updateOne(
            { _id: req.params.id },
            { $inc: { likes: -1 }, $pull: { usersLiked: req.auth.userId } }
          )
            .then(() => res.status(200).json({ message: "Vous n'aimez plus cette sauce !" }))
            .catch((error) => res.status(400).json({ error }));
        }
        if (sauce.usersDisliked.includes(req.auth.userId)) {
          Sauce.updateOne(
            { _id: req.params.id },
            { $inc: { dislikes: -1 }, $pull: { usersDisliked: req.auth.userId } }
          )
            .then(() => res.status(200).json({ message: "Dislike annulé !" }))
            .catch((error) => res.status(400).json({ error }));
        }
      })
      .catch((error) => res.status(400).json({ error }));
  }
};

