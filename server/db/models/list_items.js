const mongoose = require('mongoose')
const Schema = mongoose.Schema
mongoose.promise = Promise


const itemsSchema = new Schema({
    itemVerb: { type: String, unique: false, require: true },
    itemFreeText: { type: String, unique: false, require: true },
    itemAuthor: { type: String, unique: false, require: true }
})



const Items = mongoose.model('Items', itemsSchema)
module.exports = Items
