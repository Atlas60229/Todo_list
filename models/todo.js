const mongoose = require('mongoose')
const Schema = mongoose.Schema

const toDoSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    isDone: {
        type: Boolean,
        default: false
    },
    userID: {
        type: Schema.Types.ObjectId,
        ref: "User",
        index: true,
        require: true
    }
})

module.exports = mongoose.model('Todo', toDoSchema)
