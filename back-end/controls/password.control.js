;
'use strict'

const bcrypt = require('bcrypt')

let authenticate = (req, res, next) => {
    let user = req.body.user || null
    if (!user || user.password === '' || !user.password) {
        return res.status(200).send('Usuario o contraseña inválidos')
    } else {
        let codificationPass = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10))
        if (codificationPass) {
            req.body.user.password = codificationPass
            if (req.sessionID) {
                req.body.user.sessionID = req.sessionID
                next()
            } else {
                return res.status(200).send('No se encontró una sesión válida')
            }
        } else {
            return res.status(200).send('La contraseña no se pudo procesar')
        }
    }
}


module.exports = {
    authenticate
}
