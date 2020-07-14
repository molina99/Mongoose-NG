;
'use strict'

const express = require('express')
let api = express.Router()
const userControl = require('../controls/users.control')
const passwordControl = require('../controls/password.control')
const authenticateControl = require('../controls/authenticate.control')
const validateEmailControl = require('../controls/validation-email.control')

api.post('/postUser', [authenticateControl.authenticate, validateEmailControl.validationEmail, passwordControl.authenticate], userControl.postUser)
api.get('/getUsers', [authenticateControl.authenticate], userControl.getUsers)
api.put('/putUser/:id', [authenticateControl.authenticate, validateEmailControl.validationEmail, passwordControl.authenticate], userControl.putUser)
api.delete('/deleteUser/:id', [authenticateControl.authenticate], userControl.deleteUser)

api.post('/login', userControl.login)

module.exports = api
