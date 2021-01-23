const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ItemSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

module.exports = Item = mongoose.model('item', ItemSchema)