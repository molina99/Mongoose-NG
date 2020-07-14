;
'use strict'

const User = require('../models/User')
const jwt = require('jsonwebtoken')

let postUser = async (req, res) => {
    let user = req.body.user
    if (!user.names || !user.lastNames || !user.email || !user.password) {
        res.send('Debe completar todos los campos')
    } else {
        let newUser = new User(user)
        await newUser.save()
            .then(() => {
                res.status(200).send('Usuario creado')
            }).catch(e => {
                res.status(500).send(e)
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
    let userLog = await User.find({email: user.email})
    if (userLog.length > 0) {
        if (user.password === userLog[0].password) {
            let token = jwt.sign(user, process.env.KEY_JWT, {
                algorithm: 'HS256',
                expiresIn: parseInt(process.env.TIME)
            })
            res.status(200).json({
                ok: true,
                user, token
            })
        } else {
            res.status(200).send('Contraseña o correo incorrecto')
        }
    } else {
        res.status(200).send('La cuenta no existe')
    }
}

module.exports = {
    postUser,
    getUsers,
    putUser,
    deleteUser,
    login
}
