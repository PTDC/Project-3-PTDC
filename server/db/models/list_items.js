const mongoose = require('mongoose')
const Schema = mongoose.Schema
mongoose.promise = Promise


const itemsSchema = new Schema({
    item_verb: { type: String, unique: false }
})



const Items = mongoose.model('Items', itemsSchema)
module.exports = Items
