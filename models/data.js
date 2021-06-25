const mongoose = require('mongoose')
const Schema = mongoose.Schema

const dataSchema = new Schema({
    procedure: {
        type: String,
        require: true
    },
    timestamp: {
        type: Number,
        require: true
    },
    value: {
        type: Number,
        require: true
    }
})

const Data = mongoose.model('Data', dataSchema)
module.exports = Data