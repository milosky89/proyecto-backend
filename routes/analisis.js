const { Router } = require('express');
const { getDatas } = require('../controllers/analisis');
const { validarJWT } = require('../middlewares/validar-jwt');



const router = Router();

router.get('/analisis2', getDatas);

module.exports = router;