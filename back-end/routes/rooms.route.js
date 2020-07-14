;
'use strict'

const express = require('express')
let api = express.Router()
const roomControl = require('../controls/rooms.control')
const authenticateControl = require('../controls/authenticate.control')

api.post('/postRoom', [authenticateControl.authenticate], roomControl.postRoom)
api.get('/getRooms', [authenticateControl.authenticate], roomControl.getRooms)
api.get('/getRoomById/:id', [authenticateControl.authenticate], roomControl.getRoom)
api.put('/putRoom/:id', [authenticateControl.authenticate], roomControl.putRoom)
api.delete('/deleteRoom/:id', [authenticateControl.authenticate], roomControl.deleteRoom)

module.exports = api
