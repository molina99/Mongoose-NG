;
'use strict'

const express = require('express')
const multiParty = require('connect-multiparty')

let api = express.Router()
let filesControl = require('../controls/files.control')

let galleryMiddleware = multiParty({uploadDir: './files/gallery'})

api.post('/uploadFile', galleryMiddleware, filesControl.uploadFile)
api.get('/viewFile/:filePath', filesControl.viewFile)
api.put('/putFile/:filePath', galleryMiddleware, filesControl.putFile)
api.delete('/deleteFile/:filePath', filesControl.deleteFile)

module.exports = api
