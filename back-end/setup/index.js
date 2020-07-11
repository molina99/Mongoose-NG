;
'use strict'

const env = require('dotenv').config()
const app = require('./app')
const port = process.env.PORT || 3000

let http = require('http').Server(app)
let io = require('../controls/socket.control')(http)

http.listen(port, (err) => {
    if (!err) {
        console.log(`El servicio está funcionando en el puerto ${port}`)
    } else {
        console.log(`El servicio no está funcionando`)
    }
})
