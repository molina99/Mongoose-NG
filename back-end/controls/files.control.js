;
'use strict'
const connectDB = require('../config/db')
const fs = require('fs')
const path = require('path')

let uploadFile = (req, res) => {
    let file = req.files.uploadFile
    console.log(file)
    if (file.originalName === '') {
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
        return res.status(200).json({
            ok: true,
            data: urlFile,
            sms: urlFile.length
        })
    }
}

let viewFile = (req, res) => {
    let urlFile = req.params.urlFile
    let folder = req.params.folder
    let pathFile = `./files/${folder}/${urlFile}`
    fs.exists(pathFile, (exists) => {
        if (exists) {
            return res.status(200).sendFile(path.resolve(pathFile))
        } else {
            return res.status(400).send('No existe el archivo')
        }
    })
}

let deleteFile = (req, res) => {
    let urlFile = req.params.urlFile
    let pathfile = `./files/gallery/${urlFile}`
    fs.unlink(pathfile, (exist) => {
        if (!exist) {
            return res.status(200).send(`Se eliminó el archivo: ${urlFile}`)
        } else {
            return res.status(400).send(`No existe el archivo`)
        }
    })
}

let putFile = (req, res) => {
    let urlFile = req.params.urlFile
    let folder = req.params.folder
    let file = req.files.uploadFile
    console.log(file)
    let pathFile = `./files/${folder}/${urlFile}`
    fs.exists(pathFile, (exist) => {
        if (exist) {
            if (file.originalName === '') {
                fs.unlinkSync(file.path)
                return res.status(400).json({
                    ok: false,
                    data: null,
                    sms: 'Suba el archivo'
                })
            } else {
                fs.unlink(pathFile, (deleted) => {
                    if (!deleted) {
                        let url = file.path
                        url = url.split('/')
                        let urlFile = [url[url.length - 1]]
                        res.status(200).json({
                            ok: true,
                            data: `Archivo modificado: ${urlFile}`,
                            sms: urlFile.length
                        })
                    } else {
                        res.status(400).send('No se pudo modificar el archivo')
                    }
                })
            }
        } else {
            fs.unlinkSync(file.path)
            res.status(400).send('No existe el archivo')
        }
    })
}

module.exports = {
    uploadFile,
    viewFile,
    deleteFile,
    putFile
}

