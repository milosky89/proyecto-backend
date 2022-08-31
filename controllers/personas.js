const {response, json} = require('express');
const bcrypt = require('bcryptjs');

const Persona = require('../models/persona');
const { generarJWT } = require('../helpers/jwt');
//---------------------------------------------
const getPersonas = async(req,res) => {

    const personas = await Persona.find({}, 'email nombre apellido tipoDocumento numeroDocumento ciudad direccion comuna celular');
    res.json({
        ok:true,
        personas
    });
}

//--------------------------------------------
const creandoPersona = async(req,res = response) => {

    const {email,clave} = req.body;

    try {
        const existeEmail = await Persona.findOne({email});
        if( existeEmail){
            return res.status(400).json({
            ok: false,
            msg: 'El correo ya esta registrado'
        });
    }
        
        const persona = new Persona(req.body)

        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        persona.clave = bcrypt.hashSync(clave, salt);

        // Guarda el usuario
        await persona.save(); 

        //Generar el TOKEN - JWT
        const token = await generarJWT(persona.id)

        res.json({
            ok:true,
            persona,
            token
        });

       
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado.. revisar log'
        })
    }
}

//-------------------------------------------

//toDO: validar token y comprobar si es el usuario correcto


const actualizarPersona = async (req, res= response) => {

    const uid = req.params.id;
    try {
        const personaDB = await Persona.findById(uid);

        if(!personaDB){
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario con ese id'
            })
        }

        // Actualizaciones
        const {clave,email, ...campos} = req.body;

        if( personaDB.email !== email){

            const existeEmail = await Persona.findOne({email});
            if(existeEmail){
                return res.status(404).json({
                    ok: false,
                    msg: 'Ya existe un usuario con ese email'
                })
            }
        }
        campos.email = email;
        const personaActualizada = await Persona.findByIdAndUpdate(uid, campos, {new: true});

        
        res.json({
            ok:true,
            persona: personaActualizada
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado..'
        })
    }
}

//-----------------------------------------

const borrarPersona = async(req, res= response) => {

    const uid = req.params.id;

    try {

        const personaDB = await Persona.findById(uid);

        if(!personaDB){
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario con ese id'
            });
        }

        await Persona.findByIdAndDelete(uid);
        
        res.json({
            ok: true,
            msg: 'Usuario Eliminado correctamente'
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado.. comuniquese con el administrador'
        })
    }
}


//------------------------------------------
module.exports = {
    getPersonas,
    creandoPersona,
    actualizarPersona,
    borrarPersona,
}