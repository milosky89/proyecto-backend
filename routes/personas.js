const{ Router } = require('express');
const {check} = require('express-validator');

const{ getPersonas, creandoPersona } = require('../controllers/personas');

const router = Router();

router.get('/', getPersonas );

router.post('/',
    [
        check('email','El correo electronico es obligatorio').isEmail(),
        check('clave','la contraseña es obligatoria').not().isEmpty(),
        check('nombre','El nombre es obligatorio').not().isEmpty(),
        check('apellido', 'El apellido es obligatorio').not().isEmpty(),
        check('tipoDocumento','El tipo de documento es obligatorio').not().isEmpty(),
        check('numeroDocumento','El numero de documento es obligatorio').not().isEmpty(),
        check('ciudad','la ciudad es obligatoria').not().isEmpty(),
        check('direccion','la direccion es obligatoria').not().isEmpty(),
        check('comuna','la comuna es obligatoria').not().isEmpty(),
        check('celular','El celular es obligatorio').not().isEmpty(),
    ],
     creandoPersona );

module.exports = router;