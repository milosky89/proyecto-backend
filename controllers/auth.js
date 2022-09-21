const { response } = require('express');
const bcrypt = require('bcryptjs');

const Persona = require('../models/persona');
const { generarJWT } = require('../helpers/jwt');


const login = async( req, res = response ) => {

    const { email, clave } = req.body;

    try {
        
        // Verificar email
        const personaDB = await Persona.findOne({ email });

        if ( !personaDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'Email y/o contraseña no valido'
            });
        }

        // Verificar contraseña
        const validClave = bcrypt.compareSync( clave, personaDB.clave );

        if ( !validClave ) {
            return res.status(400).json({
                ok: false,
                msg: 'Email y/o contraseña no valido'
            });
        }

        // Generar el TOKEN - JWT
        const token = await generarJWT( personaDB.id );


        res.json({
            ok: true,
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}


const renewToken = async(req, res = response) => {

    const uid = req.uid;

    // Generar el TOKEN - JWT
    const token = await generarJWT( uid );

     // Obtener el usuario por UID
     const persona = await Persona.findById( uid );


    res.json({
        ok: true,
        token,
        persona
    });

}

module.exports = {
    login,
    renewToken
}