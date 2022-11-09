const { Router } = require('express');
const { getDatas, getData } = require('../controllers/analisis');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/analisis2', getDatas);
router.get('/analisis', getData);

module.exports = router;