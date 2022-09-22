const {response, json} = require('express');
const bcrypt = require('bcryptjs');

const Mascotas = require('../models/mascota');
const { generarJWT } = require('../helpers/jwt');



//---------------------------------------------
const getMascotas = async(req,res) => {

    //const mascotas = await Mascotas.find({}, 'nombreMascota especie raza sexo microchip fechaNacimiento vacunacion direccion comuna esterilizacion habita tipoAlimentacion adquisicion');
    const mascotas = await Mascotas.find()
                                .populate('persona','nombre apellido img');
    res.json({
        ok:true,
        mascotas
    });
}
//--------------------------------------------

const crearMascota = async(req,res = response) => {

    const uid = req.uid;
    const mascota = new Mascotas({
        persona: uid,
        ...req.body
    });

    try {
        
        const mascotaDB =await mascota.save();

        res.json({
            ok:true,
            mascota:mascotaDB
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado.. revisar log'
        })
    }  
}
//--------------------------------------------
const actualizarMascota = async(req,res) => {

    res.json({
        ok:true,
        msg: 'Actualizar mascotas'
        //mascotas
    });
}
//--------------------------------------------

const eliminarMascota = async(req,res) => {

    res.json({
        ok:true,
        msg: 'eliminar mascotas'
        //mascotas
    });
}


module.exports = {
    getMascotas,
    crearMascota,
    actualizarMascota,
    eliminarMascota
}