;
'use strict'
const jwt = require('jsonwebtoken')

let authenticate = (req, res, next) => {
    console.log(req.headers)
    let token = req.headers.authorization || null
    console.log(token)
    jwt.verify(token, process.env.KEY_JWT, (err, decode) => {
        if (err) {
            return res.status(400).json({
                data: err,
                sms: 'Invalid token'
            })
        } else {
            req.decode = decode
            console.log(decode)
            // return res.status(420).json({
            //     data,
            //     sms: 'Invalid token'
            // })
        }
    })
}


module.exports = {
    authenticate
}
