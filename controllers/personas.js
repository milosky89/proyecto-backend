const {response, json} = require('express');
const {validationResult} = require('express-validator')
const Persona = require('../models/persona');

const getPersonas = async(req,res) => {

    const personas = await Persona.find({}, 'email nombre apellido tipoDocumento numeroDocumento ciudad direccion comuna celular');
    res.json({
        ok:true,
        personas
    });
}

const creandoPersona = async(req,res = response) => {

    const {email,clave,nombre,apellido,tipoDocumento,
        numeroDocumento,ciudad,direccion,comuna,celular} = req.body;

    const errores = validationResult(req);
    if( !errores.isEmpty()) {
        return res.status(400).json({
            ok:false,
            errors: errores.mapped()
        });
    }
    try {

        const existeEmail = await Persona.findOne({email});
        
        if( existeEmail){
            return res.status(400).json({
            ok: false,
            msg: 'El correo ya esta registrado'
        });
    }
    
        const persona = new Persona(req.body)

        await persona.save(); 
        res.json({
            ok:true,
            persona
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
    getPersonas,
    creandoPersona
}