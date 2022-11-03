const { response, json } = require('express');
const bcrypt = require('bcryptjs');

const Mascotas = require('../models/mascota');
const { generarJWT } = require('../helpers/jwt');




//---------------------------------------------
const getMascotas = async (req, res) => {

    const desde = Number(req.query.desde) || 0;
    //const mascotas = await Mascotas.find({}, 'nombreMascota especie raza sexo microchip fechaNacimiento vacunacion direccion comuna esterilizacion habita tipoAlimentacion adquisicion');
    const [mascotas, total] = await Promise.all([
        Mascotas.find({}, 'nombreMascota especie caracteristica sexo microchip fechaNacimiento vacunacion direccion comuna esterilizacion habita tipoAlimentacion adquisicion estado img')
            .skip(desde)
            .limit(10)
            .populate('persona', 'nombre apellido celular img'),
        Mascotas.countDocuments()
    ])
    res.json({
        ok: true,
        mascotas,
        total
    });
}
//--------------------------------------------

const mascotasUsuario = async (req, res) => {

    const uid  = req.params.id;
    const mascotas = await Mascotas.where({persona: uid});
    res.json({
        ok: true,
        mascotas
    });
}
//--------------------------------------------

const mascotasId = async (req, res) => {

    const uid  = req.params.id;
    const mascota = await Mascotas.where({_id: uid});
    res.json({
        ok: true,
        mascota
    });
}




//--------------------------------------------

//contador de mascotas
const contadorMascotas = async (req, res) => {

    const perro = await Mascotas.where({ especie: { $eq: 'Perro' } }).countDocuments();
    const gato = await Mascotas.where({ especie: { $eq: 'Gato' } }).countDocuments();
    const total = await Mascotas.where({ especie: { $in: ['Perro', 'Gato'] } }).countDocuments();
    res.json({
        perro,
        gato,
        total
    });
}

//--------------------------------------------
const contadorMascotasId = async (req, res) => {
    const uid = req.params.id;
    const perros = await Mascotas.where({ persona: { _id: uid }, especie: { $eq: 'Perro' } }).countDocuments();
    const gatos = await Mascotas.where({ persona: { _id: uid }, especie: { $eq: 'Gato' } }).countDocuments();

    res.json({
        perros,
        gatos
    });
}

//--------------------------------------------

const crearMascota = async (req, res = response) => {

    const uid = req.uid;
    const mascota = new Mascotas({
        persona: uid,
        ...req.body
    });

    try {

        const mascotaDB = await mascota.save();

        res.json({
            ok: true,
            mascota: mascotaDB
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
const actualizarMascota = async (req, res = response) => {

    const id = req.params.id;
    const _id = req._id;
    try {

        const mascota = await Mascotas.findById(id);

        if (!mascota) {
            return res.status(404).json({
                ok: true,
                msg: 'Mascota no encontrada por Id',
            });
        }

        const cambiosMascota = {
            ...req.body,
            persona: _id
        }

        const mascotaActualizado = await Mascotas.findByIdAndUpdate(id, cambiosMascota, { new: true });


        res.json({
            ok: true,
            Mascota: mascotaActualizado
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

const eliminarMascota = async (req, res) => {

    const id = req.params.id;

    try {

        const mascota = await Mascotas.findById(id);

        if (!mascota) {
            return res.status(404).json({
                ok: true,
                msg: 'Mascota no encontrada por Id',
            });
        }

        await Mascotas.findByIdAndDelete(id)
        res.json({
            ok: true,
            msg: 'Mascota eliminada'
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado.. revisar log'
        })
    }

}


module.exports = {
    getMascotas,
    crearMascota,
    actualizarMascota,
    eliminarMascota,
    contadorMascotas,
    contadorMascotasId,
    mascotasUsuario,
    mascotasId
}