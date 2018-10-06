const db = require("../db/models");

module.exports = {
    findAll: function (req, res) {
        db.User
            .find(req.query)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    findByVerb: function (req, res) {
        // console.log("in findByVerb")
        // console.log(req.params.verb)
        // console.log(Object.keys(req.body)[0])
        db.User
            .find({primaryVerb: req.params.verb})
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    findById: function (req, res) {
        // console.log("first line inside findById of profileController")
        // console.log(req.params.id)
        db.User
            .findById(req.params.id)
            .populate("bucketItems")
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    create: function (req, res) {
        db.User
            .create(req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    update: function (req, res) {
        // console.log("beginning of profileController update function")
        console.log(( req.params.id, req.body))
        db.User
            .findOneAndUpdate({ _id: req.params.id }, req.body)
            .then(dbModel => {
                // console.log("inside update of profileController")
                res.json(dbModel)
            })
            .catch(err => res.status(422).json(err));
    },
    remove: function (req, res) {
        db.User
            .findById({ _id: req.params.id })
            .then(dbModel => dbModel.remove())
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    }
};
