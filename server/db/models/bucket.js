const mongoose = require('mongoose')
const Schema = mongoose.Schema
mongoose.promise = Promise


const bucketSchema = new Schema({
    itemVerb: { type: String, unique: false, require: true },
    itemFreeText: { type: String, unique: false, require: true },
    itemAuthor: { type: String, unique: false, require: true }
})



const Bucket = mongoose.model('Bucket', bucketSchema)
module.exports = Bucket
