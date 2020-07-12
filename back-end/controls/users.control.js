;
'use strict'

const User = require('../models/User')
const jwt = require('jsonwebtoken')

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

let login = async (req, res) => {
    let user = req.body.user
    console.log(user)
    let userLog = await User.find({email: user.email})
    console.log(userLog)
    if (!userLog) {
        res.send('No existe la cuenta')
    } else if (user.password === userLog.password) {
        res.send('Correo o contraseña incorrecta')
    } else {
        let token = jwt.sign(user, process.env.KEY_JWT, {
            algorithm: 'HS256',
            expiresIn: process.env.TIME
        })
        console.log(token)
    }
    res.status(200).json({
        ok: true,
        user
    })
}

module.exports = {
    postUser,
    getUsers,
    putUser,
    deleteUser,
    login
}
