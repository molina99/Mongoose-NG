;
'use strict'

const mongoose = require('mongoose')
const {Schema} = mongoose

const UserSchema = new Schema({
    names: {type: String, required: true},
    lastNames: {type: String, required: true},
    // photo: {type: String},
    email: {type: String, required: true},
    password: {type: String, required: true}
})

module.exports = mongoose.model('users', UserSchema)
