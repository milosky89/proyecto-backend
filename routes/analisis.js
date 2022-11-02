const { Router } = require('express');
const { getData } = require('../controllers/analisis');
const { validarJWT } = require('../middlewares/validar-jwt');



const router = Router();

router.get('/analisis/', getData);

module.exports = router;