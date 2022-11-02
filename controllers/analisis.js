const { response } = require('express');

const Persona = require('../models/persona')
const Mascota = require('../models/mascota');
const mascota = require('../models/mascota');

const getData = async (req, res = response) => {

    const consulta = req.query.consulta
    var comunas = [];
    var query = { comuna: /^Comuna/ };
    const perroxcomunaT = await Mascota.find(query)
    perroxcomunaT.forEach(element => {
        const result = element.comuna
        comunas.push(result)
    });
    let filtroComunas = comunas.filter((item, index) => {
        return comunas.indexOf(item) === index;
    })
    switch (consulta) {
        case 'Tipo de mascota':
            const resultado = []
            for (var i = 0; i < filtroComunas.length; i++) {
                const perro = await Mascota.find({ mascota: 'perro', comuna: filtroComunas[i] }).countDocuments();
                const gato = await Mascota.find({ mascota: 'gato', comuna: filtroComunas[i] }).countDocuments();
                resultado.push({ comuna: filtroComunas[i], perro: perro, gato: gato })
            }
            res.json({
                resultado
            });
            break;

        case 'Sexo':
            var resultadoS = []
            for (var i = 0; i < filtroComunas.length; i++) {
                const perroM = await Mascota.find({ mascota: 'perro', comuna: filtroComunas[i], sexo: 'Macho' }).countDocuments();
                const perroH = await Mascota.find({ mascota: 'perro', comuna: filtroComunas[i], sexo: 'Hembra' }).countDocuments();
                const gatoM = await Mascota.find({ mascota: 'gato', comuna: filtroComunas[i], sexo: 'Macho' }).countDocuments();
                const gatoH = await Mascota.find({ mascota: 'gato', comuna: filtroComunas[i], sexo: 'Hembra' }).countDocuments();
                resultadoS.push({ comuna: filtroComunas[i], perroM: perroM, perroH: perroH, gatoM: gatoM, gatoH: gatoH })

            }
            res.json({
                resultadoS
            });
            break;
        case 'Adquisición':
            var resultadoA = []
            for (var i = 0; i < filtroComunas.length; i++) {
                const perroC = await Mascota.find({ mascota: 'perro', comuna: filtroComunas[i], adquisicion: 'Compra' }).countDocuments();
                const perroA = await Mascota.find({ mascota: 'perro', comuna: filtroComunas[i], adquisicion: 'Adopción' }).countDocuments();
                const gatoC = await Mascota.find({ mascota: 'gato', comuna: filtroComunas[i], adquisicion: 'Compra' }).countDocuments();
                const gatoA = await Mascota.find({ mascota: 'gato', comuna: filtroComunas[i], adquisicion: 'Adopción' }).countDocuments();
                resultadoA.push({ comuna: filtroComunas[i], perroC: perroC, perroA: perroA, gatoC: gatoC, gatoA: gatoA })

            }
            res.json({
                resultadoA
            });
            break;
        case 'Esterilizacion':
            var resultadoE = []
            for (var i = 0; i < filtroComunas.length; i++) {
                const perroS = await Mascota.find({ mascota: 'perro', comuna: filtroComunas[i], esterilizacion: 'Si' }).countDocuments();
                const perroN = await Mascota.find({ mascota: 'perro', comuna: filtroComunas[i], esterilizacion: 'No' }).countDocuments();
                const gatoS = await Mascota.find({ mascota: 'gato', comuna: filtroComunas[i], esterilizacion: 'Si' }).countDocuments();
                const gatoN = await Mascota.find({ mascota: 'gato', comuna: filtroComunas[i], esterilizacion: 'No' }).countDocuments();
                resultadoE.push({ comuna: filtroComunas[i], perroS: perroS, perroN: perroN, gatoS: gatoS, gatoN: gatoN })

            }
            res.json({
                resultadoE
            });
            break;
        case 'Esquema de vacunación':
            var resultadoV = []
            for (var i = 0; i < filtroComunas.length; i++) {
                const perroS = await Mascota.find({ mascota: 'perro', comuna: filtroComunas[i], vacunacion: 'Si' }).countDocuments();
                const perroN = await Mascota.find({ mascota: 'perro', comuna: filtroComunas[i], vacunacion: 'No' }).countDocuments();
                const gatoS = await Mascota.find({ mascota: 'gato', comuna: filtroComunas[i], vacunacion: 'Si' }).countDocuments();
                const gatoN = await Mascota.find({ mascota: 'gato', comuna: filtroComunas[i], vacunacion: 'No' }).countDocuments();
                resultadoV.push({ comuna: filtroComunas[i], perroS: perroS, perroN: perroN, gatoS: gatoS, gatoN: gatoN })

            }
            res.json({
                resultadoV
            });
            break;
        case 'Tipo alimentación':
            var resultadoT = []
            for (var i = 0; i < filtroComunas.length; i++) {
                const perroCO = await Mascota.find({ mascota: 'perro', comuna: filtroComunas[i], tipoAlimentacion: 'Concentrado' }).countDocuments();
                const perroCA = await Mascota.find({ mascota: 'perro', comuna: filtroComunas[i], tipoAlimentacion: 'Casero' }).countDocuments();
                const gatoCO = await Mascota.find({ mascota: 'gato', comuna: filtroComunas[i], tipoAlimentacion: 'Concentrado' }).countDocuments();
                const gatoCA = await Mascota.find({ mascota: 'gato', comuna: filtroComunas[i], tipoAlimentacion: 'Casero' }).countDocuments();
                resultadoT.push({ comuna: filtroComunas[i], perroCO: perroCO, perroCA: perroCA, gatoCO: gatoCO, gatoCA: gatoCA })
            }
            res.json({
                resultadoT
            });
            break;

        default:
            console.log(`Sorry, we are out of ${consulta}.`);
    }



}



module.exports = {
    getData
}