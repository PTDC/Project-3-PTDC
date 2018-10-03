const db = require("../db/models");
// console.log(db)
module.exports = {
    findAll: function (req, res) {
        db.Bucket
            .find(req.query)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
      findById: function(req, res) {
        console.log("hi "+req.params.id)
        db.Bucket
          .find({itemAuthor: req.params.id})
          .then(dbModel => 
            res.json(dbModel))
          .catch(err => res.status(422).json(err));
      },
    // find: function (req, res) {
    //     console.log("is this thing here?")
    //     db.Bucket
    //         .find({ itemAuthor: req.params.id })
    //         //the endpoint response doesn't appear correct
    //         .then(console.log("here it is: " + Object.keys(res)))
    //         .catch(err => res.status(422).json(err));
    // },
    create: function (req, res) {
        // console.log("I am in the bucketController create function")
        // console.log(req.body)
        db.Bucket
            .create(req.body)
            .then(dbModel => {
                console.log("req body itemAuthor"+ req.body.itemAuthor)
                console.log("dbModel id"+ dbModel._id)
                db.User
                    .update(
                        { _id: req.body.itemAuthor },
                        { $push: { bucketItems: dbModel._id } }
                    )
                    .then(res => res.json(res))
                    .catch(err => res.status(422).json(err));
            })
            .catch(err => res.status(422).json(err));
    },
    update: function (req, res) {
        db.Bucket
            .findOneAndUpdate({ _id: req.params.id }, req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    remove: function (req, res) {
        db.Bucket
            .findById({ _id: req.params.id })
            .then(dbModel => dbModel.remove())
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    }
};
