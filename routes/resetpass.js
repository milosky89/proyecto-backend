
const{ Router } = require('express');
const mdAutenticacion = require('../middlewares/validar-jwt');
const bcrypt = require('bcryptjs');
const jwt_decode = require('jwt-decode');
 
 
const router = Router();
//
const Persona = require('../models/persona');
//
//Rutas
router.put('/a', mdAutenticacion.validarJWT, async (req, res) => {
 
    
 
    let body = req.body;
    let token = req.get('x-token');
    
 
    console.log(body);
    console.log(token)
 
    var decoded = jwt_decode(token);
    var email = decoded.to;

   
    var persona = new Persona({
        clave: bcrypt.hashSync(body.clave, 10)
    });
 
    let personaDB = await Persona.findOne({email});
       
        if (!personaDB) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar usuario',
                errors: err
            });
        }
 
        if (!personaDB) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Credenciales Incorrectas - email',
                errors: err
            });
        }
        personaDB.clave = persona.clave;
        const {clave, ...campos} = personaDB;
        campos.clave = persona.clave
        const uid = personaDB.id
        const claveActualizada = await Persona.findByIdAndUpdate(uid, campos, {new: true});
        res.json({
            ok:true,
            persona: claveActualizada
        });
        /*personaDB.update((err, personaGuardado) => {
 
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error al actualizar usuario',
                    errors: err
                });
            }
 
            personaGuardado.clave = ':)';
 
            res.status(200).json({
                ok: true,
                persona: personaGuardado
            });
        })*/
 
  
})
 
module.exports = router;