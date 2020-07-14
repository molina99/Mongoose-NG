;
'use strict'

const mongoose = require('mongoose')
const {Schema} = mongoose

const RoomSchema = new Schema({
    ip: {type: String, required: true},
    password: {type: String, required: true}
})

module.exports = mongoose.model('rooms', RoomSchema)
