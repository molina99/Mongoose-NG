;
'use strict'

const express = require('express')
const multiParty = require('connect-multiparty')

let api = express.Router()
let filesControl = require('../controls/files.control')

const authenticateControl = require('../controls/authenticate.control')
let galleryMiddleware = multiParty({uploadDir: './files'})

api.post('/uploadFile', [authenticateControl.authenticate, galleryMiddleware], filesControl.uploadFile)
api.get('/viewFile/:filePath', [authenticateControl.authenticate], filesControl.viewFile)
api.put('/putFile/:filePath', [authenticateControl.authenticate, galleryMiddleware], filesControl.putFile)
api.delete('/deleteFile/:filePath', [authenticateControl.authenticate], filesControl.deleteFile)

module.exports = api
