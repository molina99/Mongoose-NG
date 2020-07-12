;
'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const passport = require('passport')
const cors = require('cors')
require('../config/db')

let app = express()

let userRoute = require('../routes/users.route')
let fileRoute = require('../routes/files.route')

let session = require('express-session')
let sess = {
    secret: process.env.KEY_SESSION,
    resave: false,
    saveUninitialized: true,
    name: 'sessionID',
    cookie: {
        httpOnly: false,
        maxAge: parseInt(process.env.TIME)
    }
}

// For access client
let corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200
}

app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())

// CORS
app.use(cors(corsOptions))

// SESSION
app.use(session(sess))

// PASSPORT
app.use(passport.initialize())
app.use(passport.session())

app.use('/api', userRoute)
app.use('/api', fileRoute)

module.exports = app
