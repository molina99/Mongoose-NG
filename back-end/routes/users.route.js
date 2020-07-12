;
'use strict'

const express = require('express')
let api = express.Router()
const userControl = require('../controls/users.control')

api.post('/postUser', userControl.postUser)
api.get('/getUsers', userControl.getUsers)
api.put('/putUser/:id', userControl.putUser)
api.delete('/deleteUser/:id', userControl.deleteUser)

module.exports = api
