;
'use strict'

const User = require('../models/User')

let postUser = async (req, res) => {
    let user = req.body.user
    console.log(user)
    if (!user.names || !user.lastNames || !user.email || !user.password) {
        alert('Ingrese todos los datos')
    } else {
        let newUser = new User(user)
        console.log(newUser)
        await newUser.save()
            .then(() => {
                res.send('Usuario creado')
            }).catch(e => {
                res.send(e)
            })
    }
}


module.exports = {
    postUser
}
