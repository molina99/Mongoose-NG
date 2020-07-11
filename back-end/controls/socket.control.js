;
'use strict'

const manageDocuments = (http) => {
    let io = require('socket.io')(http)
    const manageData = {}
    io.on('connection', socket => {
        let previousId
        const safeJoin = currentId => {
            socket.leave(previousId)     // Salir de una sala
            socket.join(currentId)       // Unirme a una sala
            previousId = currentId
        }
        socket.on('getDoc', docId => {
            safeJoin(docId)
            socket.emit('manageDato', manageData[docId])
        })
        socket.on('addDoc', doc => {
            let rooms = Object.keys(manageData)
            let nameRooms = rooms.length + 1
            let nameRoom = `Document ${nameRooms}`
            doc.id = nameRoom
            console.log(doc)
            manageData[doc.id] = doc
            console.log(manageData)
            safeJoin(doc.id)
            io.emit('manageData', Object.keys(manageData))
            socket.emit('manageDato', doc)
        })
        socket.on('editDoc', doc => {
            manageData[doc.id] = doc
            socket.to(doc.id).emit('manageDato', doc)
        })

        io.emit('manageData', Object.keys(manageData))
    })
}

module.exports = manageDocuments
