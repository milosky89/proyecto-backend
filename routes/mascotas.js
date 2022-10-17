/*
    Mascotas
    path: /api/mascotas
*/

const{ Router } = require('express');
const {check} = require('express-validator');
const {validarCampos} = require('../middlewares/validar-campos');

const { getMascotas,crearMascota,actualizarMascota,eliminarMascota, contadorMascotas, contadorMascotasId, mascotasUsuario, mascotasId} = require('../controllers/mascotas');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

// Mostrar mascotas registradas
router.get('/',validarJWT, getMascotas );

// cantidad de mascotas registrados
router.get('/:especie', contadorMascotas );

// mascotas por usuario
router.get('/count/:id', contadorMascotasId );

// mascotas del usuario
router.get('/registro/:id',validarJWT, mascotasUsuario );

router.get('/consulta/:id', validarJWT,mascotasId );

//Crear mascota
router.post('/',
    [
        validarJWT,
        check('nombreMascota','El nombre de la mascota es obligatorio').not().isEmpty(),
        check('especie','La especie es obligatoria').not().isEmpty(),
        check('caracteristica','La caracteristica es obligatoria').not().isEmpty(),
        check('sexo', 'El sexo es obligatorio').not().isEmpty(),
        check('microChip','El microchip es obligatorio').not().isEmpty(),
        check('edad','La fecha de nacimiento es obligatorio').not().isEmpty(),
        check('vacunacion','La vacunacion es obligatoria').not().isEmpty(),
        check('direccion','La direccion es obligatoria').not().isEmpty(),
        check('comuna','La comuna es obligatoria').not().isEmpty(),
        check('esterilizacion','La esterilizacion es obligatoria').not().isEmpty(),
        check('habita','El habita es obligatorio').not().isEmpty(),
        check('tipoAlimentacion','El tipo de alimentacion es obligatorio').not().isEmpty(),
        check('adquisicion','La adquisicion es obligatoria').not().isEmpty(),
        check('estado','El estado es obligatoria').not().isEmpty(),
        validarCampos, 
    ],
    crearMascota );


// Modificar mascota creada
router.put('/:id',
    [
        validarJWT,
        check('nombreMascota','El nombre de la mascota es obligatorio').not().isEmpty(),
        check('especie','La especie es obligatoria').not().isEmpty(),
        check('caracteristica','La caracteristica es obligatoria').not().isEmpty(),
        check('sexo', 'El sexo es obligatorio').not().isEmpty(),
        check('microChip','El microchip es obligatorio').not().isEmpty(),
        check('edad','La edad es obligatorio').not().isEmpty(),
        check('vacunacion','La vacunacion es obligatoria').not().isEmpty(),
        check('direccion','La direccion es obligatoria').not().isEmpty(),
        check('comuna','La comuna es obligatoria').not().isEmpty(),
        check('esterilizacion','La esterilizacion es obligatoria').not().isEmpty(),
        check('habita','El habita es obligatorio').not().isEmpty(),
        check('tipoAlimentacion','El tipo de alimentacion es obligatorio').not().isEmpty(),
        check('adquisicion','La adquisicion es obligatoria').not().isEmpty(),
        validarCampos,
        
    ],
    actualizarMascota
);

// Eliminar mascota
router.delete('/:id',validarJWT, eliminarMascota)

module.exports = router;