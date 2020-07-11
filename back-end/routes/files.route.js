;
'use strict'

const express = require('express')
const multiParty = require('connect-multiparty')

let api = express.Router()
let filesControl = require('../controls/files.control')

let galleryMiddleware = multiParty({uploadDir: './files/gallery'})

api.post('/upload_gallery', galleryMiddleware, filesControl.uploadFile)
api.get('/file_gallery/:folder/:urlFile', filesControl.viewFile)
api.delete('/delete_gallery/:urlFile', filesControl.deleteFile)
api.put('/put_gallery/:folder/:urlFile', galleryMiddleware, filesControl.putFile)

module.exports = api
