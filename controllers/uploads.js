const path = require('path');
const fs = require('fs');

const {response, json} = require("express");
const { v4: uuidv4 } = require('uuid');
const {actualizarImagen} = require('../helpers/actualizar-imagen');

const fileUpload = (req, res = response) => {

    const tipo = req.params.tipo;
    const id = req.params.id;

    //Validar tipo
    const tiposValidos = ['personas','mascotas'];
    if(!tiposValidos.includes(tipo)){
        return res.status(400).json({
            ok: false,
            msg: 'No es una persona o mascota'
        });
    }

    //Validar que existe un archivo
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No hay ningun archivo'
        });
      }

    // Procesar imagen
    const file = req.files.imagen;
    const nombreCortado = file.name.split('.');
    const extensionArchivo = nombreCortado[nombreCortado.length - 1];

    
    // Validar extension
    const extensionesValidas = ['png','jpg','jpeg'];
    if( !extensionesValidas.includes(extensionArchivo)){
        return res.status(400).json({
            ok: false,
            msg: 'No es un extensión permitida'
        });
    }

    //Generar nombre del archivo
    const nombreArchivo = `${uuidv4()}.${extensionArchivo}`;

    // Path para guardar imagen
    const path = `./uploads/${tipo}/${nombreArchivo}`;

    // Mover imagen
    file.mv(path, (err) => {
        if (err){ 
        return res.status(500).json({
                ok: false,
                msg: 'Error al mover la imagen'
            });
        }

        //Actualizar base de datos 
        actualizarImagen(tipo,id,nombreArchivo);

        res.json({
            ok:true,
            msg: 'Archivo cargado',
            nombreArchivo
        });
    });
}


const retornaImagen = ( req, res = response) => {

    const tipo = req.params.tipo;
    const foto = req.params.foto;

    const pathImg = path.join(__dirname, `../uploads/${tipo}/${foto}`);

    //Imagen por defecto
    if(fs.existsSync(pathImg)){
        res.sendFile(pathImg);
    }else{
        const pathImg = path.join(__dirname, `../uploads/default.jpg`);
        res.sendFile(pathImg);
    }

    
}

module.exports = {
    fileUpload,
    retornaImagen
}



