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
    create: async (req, res) => {
        try {
            const create = await db.Bucket.create(req.body)
            // console.log("create: " + create)
            const update_user = await db.User.update({_id: req.body.itemAuthor}, {$push: {bucketItems: create._id}})
            // console.log("update: " + update_user)
            res.status(200).json(update_user)
        } catch(err) {
            // console.log(err)
            res.status(422).json(err)
        }
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
