;
'use strict'

const mongoose = require('mongoose')
const {Schema} = mongoose

const FileSchema = new Schema({
    filePath: {type: String, required: true},
})

module.exports = mongoose.model('files', FileSchema)
