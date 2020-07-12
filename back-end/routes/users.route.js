;
'use strict'

const express = require('express')
let api = express.Router()
const userControl = require('../controls/users.control')
const passwordControl = require('../controls/password.control')
const authenticateControl = require('../controls/authenticate.control')

api.post('/postUser', [passwordControl.authenticate], userControl.postUser)
api.get('/getUsers', userControl.getUsers)
api.put('/putUser/:id', [passwordControl.authenticate], userControl.putUser)
api.delete('/deleteUser/:id', userControl.deleteUser)

api.post('/login', [authenticateControl.authenticate], userControl.login)

module.exports = api
