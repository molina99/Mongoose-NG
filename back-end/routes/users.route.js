;
'use strict'

const express = require('express')
let api = express.Router()
const userControl = require('../controls/users.control')

api.post('/postUser', userControl.postUser)

module.exports = api
