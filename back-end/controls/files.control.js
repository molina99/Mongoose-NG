;
'use strict'
const File = require('../models/File')
const fs = require('fs')
const path = require('path')

let uploadFile = async (req, res) => {
    let file = req.files.uploadFile
    console.log(file)
    if (file.originalFilename === '') {
        fs.unlinkSync(file.path)
        return res.status(400).json({
            ok: false,
            data: null,
            sms: `No existe el archivo`
        })
    } else {
        let url = file.path
        url = url.split('/')
        let urlFile = [url[url.length - 1]]
        let convertToString = urlFile.toString()
        console.log(convertToString)
        let newFile = new File({filePath: convertToString})
        console.log(newFile)
        await newFile.save()
            .then(() => {
                res.send('Imagen almacenada')
            }).catch(e => {
                res.send(e)
            })
    }
}

let viewFile = async (req, res) => {
    let filePath = req.params.filePath
    let findFile = await File.find({filePath: filePath})
    console.log(findFile)
    if (!findFile) {
        res.send('No existe el archivo')
    } else {
        let dir = `./files/gallery/${filePath}`
        fs.exists(dir, (exists) => {
            if (exists) {
                return res.status(200).sendFile(path.resolve(dir))
            } else {
                return res.status(400).send('El archivo no se encuentra disponible')
            }
        })
    }
}

let putFile = async (req, res) => {
    let filePath = req.params.filePath
    let file = req.files.uploadFile
    console.log(file)
    let findFile = await File.find({filePath: filePath})
    console.log(findFile)
    if (!findFile) {
        res.send('No existe el archivo que se quiere modificar')
    } else {
        let dir = `./files/gallery/${filePath}`
        fs.exists(dir, (exist) => {
            if (exist) {
                fs.unlink(dir, (deleted) => {
                    if (!deleted) {
                        let url = file.path.split('/')
                        let urlFile = [url[url.length - 1]]
                        let convertToString = urlFile.toString()
                        console.log(convertToString)
                        let newFile = new File({filePath: convertToString})
                        console.log(newFile)
                        newFile.save()
                            .then(() => {
                                res.send('Imagen almacenada')
                            }).catch(e => {
                            res.send(e)
                        })
                    } else {
                        res.status(400).send('No se pudo modificar el archivo')
                    }
                })

            } else {
                fs.unlinkSync(file.path)
                res.status(400).send('No existe el archivo')
            }
        })
    }
}

let deleteFile = async (req, res) => {
    let filePath = req.params.filePath
    let deleteUser = await File.deleteOne({filePath: filePath})
    if (deleteUser) {
        console.log('Eliminado en BD')
        let dir = `./files/gallery/${filePath}`
        fs.unlink(dir, (deleted) => {
            if (!deleted) {
                return res.status(200).send(`Se eliminó el archivo: ${filePath}`)
            } else {
                return res.status(400).send('No existe el archivo')
            }
        })
    } else {
        res.send('Algo salió mal')
    }
}

module.exports = {
    uploadFile,
    viewFile,
    deleteFile,
    putFile
}

