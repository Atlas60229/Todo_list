const mongoose = require('mongoose')
const Schema = mongoose.Schema

const toDoSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    done:{
        type: Boolean
    }
})

module.exports = mongoose.model('Todo', toDoSchema)
