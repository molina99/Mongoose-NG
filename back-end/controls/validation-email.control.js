;
'use strict'

let validationEmail = (req, res, next) => {
    let user = req.body.user
    let path = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/
    let validate = path.test(user.email)
    if (validate) {
        next()
    } else {
        res.status(200).send('El correo no es válido')
    }
}

module.exports = {
    validationEmail
}
