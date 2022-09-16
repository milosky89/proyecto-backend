/*
    Personas
    path: /api/personas
*/

const{ Router } = require('express');
const {check} = require('express-validator');
const {validarCampos} = require('../middlewares/validar-campos');

const{ getPersonas, creandoPersona, actualizarPersona, borrarPersona } = require('../controllers/personas');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

// Mostrar personas registradas
router.get('/',validarJWT, getPersonas );

//Crar personas
router.post('/',
    [
        check('email','El correo electronico es obligatorio').isEmail(),
        check('clave','la contraseña es obligatoria').not().isEmpty(),
        check('nombre','El nombre es obligatorio').not().isEmpty(),
        check('apellido', 'El apellido es obligatorio').not().isEmpty(),
        check('tipoDocumento','El tipo de documento es obligatorio').not().isEmpty(),
        check('numeroDocumento','El numero de documento es obligatorio').not().isEmpty(),
        check('tipoUsuario','El tipo de usuario es obligatoria').not().isEmpty(),
        check('celular','El celular es obligatorio').not().isEmpty(),
        validarCampos,
    ],
     creandoPersona );


// Modificar persona creada
router.put('/:id',
    [
        validarJWT,
        check('email','El correo electronico es obligatorio').isEmail(),
        check('clave','la contraseña es obligatoria').not().isEmpty(),
        check('nombre','El nombre es obligatorio').not().isEmpty(),
        check('apellido', 'El apellido es obligatorio').not().isEmpty(),
        check('tipoDocumento','El tipo de documento es obligatorio').not().isEmpty(),
        check('numeroDocumento','El numero de documento es obligatorio').not().isEmpty(),
        check('tipoUsuario','El tipo de usuario es obligatoria').not().isEmpty(),
        check('celular','El celular es obligatorio').not().isEmpty(),
        check('estado','El estado es obligatorio').not().isEmpty(),
        validarCampos,
    ],
    actualizarPersona
);

// Eliminar persona
router.delete('/:id',validarJWT, borrarPersona)

module.exports = router;