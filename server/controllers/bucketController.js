const db = require("../db/models");
// console.log(db)
module.exports = {
  findAll: function(req, res) {
    db.Bucket
      .find(req.query)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    db.Bucket
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    // console.log("I am in the bucketController create function")
    // console.log(req.body)
    db.Bucket
      .create(req.body)
      .then(dbModel => res.json("okay"))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    db.Bucket
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.Bucket
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
