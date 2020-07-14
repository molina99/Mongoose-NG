;
'use strict'
const jwt = require('jsonwebtoken')

let authenticate = (req, res, next) => {
    let token = req.headers.authorization || null
    jwt.verify(token, process.env.KEY_JWT, (err, decode) => {
        if (err) {
            return res.status(400).json({
                data: err,
                sms: 'Token inválido'
            })
        } else {
            req.decode = decode
            console.log(decode)
            next()
        }
    })
}

module.exports = {
    authenticate
}
