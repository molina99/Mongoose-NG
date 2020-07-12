;
'use strict'

const User = require('../models/User')

let postUser = async (req, res) => {
    let user = req.body.user
    console.log(user)
    if (!user.names || !user.lastNames || !user.email || !user.password) {
        res.send('Debe completar todos los campos')
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

let getUsers = async (req, res) => {
    let users = await User.find()
    if (users) {
        res.status(200).json({
            ok: true,
            users
        })
    } else if (users.length === 0) {
        res.send('No hay ningún usuario registrado')
    } else {
        res.status(500).json({
            ok: false,
            data: null
        })
    }
}

let putUser = async (req, res) => {
    let id = req.params.id
    let user = req.body.user
    let putUser = await User.findByIdAndUpdate({_id: id}, {
        $set: {names: user.names, lastNames: user.lastNames, email: user.email, password: user.password}
    }, {new: true})
    if (putUser) {
        res.status(200).json({
            ok: true,
            putUser,
            sms: 'Actualizado'
        })
    } else {
        res.send('Algo salió mal')
    }
}

let deleteUser = async (req, res) => {
    let id = req.params.id
    let deleteUser = await User.deleteOne({_id: id})
    if (deleteUser) {
        res.status(200).json({
            ok: true,
            sms: 'Eliminado'
        })
    } else {
        res.send('Algo salió mal')
    }
}

module.exports = {
    postUser,
    getUsers,
    putUser,
    deleteUser
}
