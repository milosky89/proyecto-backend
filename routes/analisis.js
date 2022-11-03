const { Router } = require('express');
const { getData,getDatas } = require('../controllers/analisis');
const { validarJWT } = require('../middlewares/validar-jwt');



const router = Router();

router.get('/analisis/', getData);
router.get('/analisis2', getDatas);

module.exports = router;