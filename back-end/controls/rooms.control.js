;
'use strict'

const Room = require('../models/Room')

let postRoom = async (req, res) => {
    let room = req.body.room
    if (!room.ip || !room.password) {
        res.send('Debe completar todos los campos')
    } else {
        let newRoom = new Room(room)
        await newRoom.save()
            .then(() => {
                res.status(200).send('Sala creada')
            }).catch(e => {
                res.status(500).send(e)
            })
    }
}

let getRooms = async (req, res) => {
    let rooms = await Room.find()
    if (rooms) {
        res.status(200).json({
            ok: true,
            rooms
        })
    } else if (rooms.length === 0) {
        res.send('No hay ninguna sala creada')
    } else {
        res.status(500).json({
            ok: false,
            data: null
        })
    }
}

let getRoom = async (req, res) => {
    let id = req.params.id
    let room = await Room.findById({_id: id})
    if (room) {
        res.status(200).json({
            ok: true,
            room
        })
    } else {
        res.status(500).json({
            ok: false,
            data: null
        })
    }
}

let putRoom = async (req, res) => {
    let id = req.params.id
    let room = req.body.room
    let putRoom = await Room.findByIdAndUpdate({_id: id}, {
        $set: {ip: room.ip, password: room.password}
    }, {new: true})
    if (putRoom) {
        res.status(200).json({
            ok: true,
            putRoom,
            sms: 'Sala actualizada'
        })
    } else {
        res.send('Algo salió mal')
    }
}

let deleteRoom = async (req, res) => {
    let id = req.params.id
    let deleteRoom = await Room.deleteOne({_id: id})
    if (deleteRoom) {
        res.status(200).json({
            ok: true,
            sms: 'Sala eliminada'
        })
    } else {
        res.send('Algo salió mal')
    }
}

module.exports = {
    postRoom,
    getRooms,
    getRoom,
    putRoom,
    deleteRoom
}
