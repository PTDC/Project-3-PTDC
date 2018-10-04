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

const create_bucket = await db.Bucket.create(req.body)
const user = await db.User.findById(req.body.itemAuthor).populate('bucketItems')

//Get all items
var verbs = {}
var primaryVerb
var highestCount = 0;

var i;
for (i = 0; i < user.bucketItems.length; i++) {
    var verb = user.bucketItems[i].itemVerb
    var count = verbs[verb] + 1 || 1
    verbs[verb] = count
}
verbs[create_bucket.itemVerb] = verbs[create_bucket.itemVerb] + 1 || 1

for (var key in verbs) {
    if (verbs[key] > highestCount) {
        highestCount = verbs[key]
        primaryVerb = key
    }
}

const update_user = await db.User.update({_id: req.body.itemAuthor}, {$push: {bucketItems: create_bucket._id}, primaryVerb: primaryVerb })
res.json(update_user)