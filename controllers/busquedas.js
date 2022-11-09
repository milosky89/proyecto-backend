const { response } = require('express');

const Persona = require('../models/persona')
const Mascota = require('../models/mascota')

const getBusquedaTodo = async(req, res = response)=>{

    const busqueda = req.params.busqueda;
    const regx = new RegExp(busqueda, 'i');  
    
    const [persona,mascota] = await Promise.all([ 
          Persona.find({nombre: regx}),
          Mascota.find({nombreMascota: regx}),       
        ])

    res.json({
        ok: true,
        persona,
        mascota
    })
}

const getDocumentosColeccion = async(req, res = response)=>{

    const tabla = req.params.tabla; 
    const busqueda = req.params.busqueda;
    const regx = new RegExp(busqueda, 'i');

    let data =[]

    switch (tabla) {
        case 'mascotas':
             data = await Mascota.find({nombreMascota: regx})
                                 .populate('persona','nombre apellido celular img');        
            break;

        case 'personas':
            data = await Persona.find({nombre: regx});
            break;
    
        default:
            return res.status(400).json({
                ok:false,
                msg: 'La tabla tiene que se mascotas/personas'
            })
            break;
    }

    res.json({
        ok: true,
        resultados: data
    })
}


module.exports = {
    getBusquedaTodo,
    getDocumentosColeccion
}