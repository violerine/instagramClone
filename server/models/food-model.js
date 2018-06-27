const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

let foodSchema = mongoose.Schema({
    name : String,
    desc : String,
    location : String,
    url: String,
    username : String
},{timestamps:{createdAt: 'created_at',updatedAt: 'updated_at'}})

let Foods = mongoose.model('Food',foodSchema)

module.exports = Foods