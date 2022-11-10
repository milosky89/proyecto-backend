const { response } = require('express');

const Mascota = require('../models/mascota');


// funcion Graficas de pie

const getDatas = async (req, res = response) => {
    const comuna = req.query.comuna
    const consulta = req.query.consulta
    switch (consulta) {
        case 'Tipo de mascota':
            const perro = await Mascota.find({ especie: 'Perro', comuna: comuna }).countDocuments();
            const gato = await Mascota.find({ especie: 'Gato', comuna: comuna }).countDocuments();

            res.json({
                perro,
                gato,
            });
            break;
        case 'Tipo de Alimentación':
            const perro_concentrado = await Mascota.find({ especie: 'Perro', comuna: comuna, tipoAlimentacion: 'Concentrado' }).countDocuments();
            const perroCA = await Mascota.find({ especie: 'Perro', comuna: comuna, tipoAlimentacion: 'Casero' }).countDocuments();
            const perroMi = await Mascota.find({ especie: 'Perro', comuna: comuna, tipoAlimentacion: 'Mixto' }).countDocuments();
            const gatoCO = await Mascota.find({ especie: 'Gato', comuna: comuna, tipoAlimentacion: 'Concentrado' }).countDocuments();
            const gatoCA = await Mascota.find({ especie: 'Gato', comuna: comuna, tipoAlimentacion: 'Casero' }).countDocuments();
            const gatoMi = await Mascota.find({ especie: 'Gato', comuna: comuna, tipoAlimentacion: 'Mixto' }).countDocuments();
            
            res.json({
                perro_concentrado,
                perroCA,
                perroMi,
                gatoCO,
                gatoCA,
                gatoMi,
            });
            break;
        case 'Sexo':
            const perroM = await Mascota.find({ especie: 'Perro', comuna: comuna, sexo: 'Macho' }).countDocuments();
            const perroH = await Mascota.find({ especie: 'Perro', comuna: comuna, sexo: 'Hembra' }).countDocuments();
            const gatoM = await Mascota.find({ especie: 'Gato', comuna: comuna, sexo: 'Macho' }).countDocuments();
            const gatoH = await Mascota.find({ especie: 'Gato', comuna: comuna, sexo: 'Hembra' }).countDocuments();

            res.json({
                perroM,
                perroH,
                gatoM,
                gatoH,
            });
            break;
        case 'Adquisición':
            const perroC = await Mascota.find({ especie: 'Perro', comuna: comuna, adquisicion: 'Compra' }).countDocuments();
            const perroA = await Mascota.find({ especie: 'Perro', comuna: comuna, adquisicion: 'Adopción' }).countDocuments();
            const gatoC = await Mascota.find({ especie: 'Gato', comuna: comuna, adquisicion: 'Compra' }).countDocuments();
            const gatoA = await Mascota.find({ especie: 'Gato', comuna: comuna, adquisicion: 'Adopción' }).countDocuments();

            res.json({
                perroC,
                perroA,
                gatoC,
                gatoA,
            });
            break;
        case 'Esterilización':
            const perroS = await Mascota.find({ especie: 'Perro', comuna: comuna, esterilizacion: 'Si' }).countDocuments();
            const perroN = await Mascota.find({ especie: 'Perro', comuna: comuna, esterilizacion: 'No' }).countDocuments();
            const gatoS = await Mascota.find({ especie: 'Gato', comuna: comuna, esterilizacion: 'Si' }).countDocuments();
            const gatoN = await Mascota.find({ especie: 'Gato', comuna: comuna, esterilizacion: 'No' }).countDocuments();

            res.json({
                perroS,
                perroN,
                gatoS,
                gatoN,
            });
            break;
        case 'Esquema de vacunación':
            const perroSi = await Mascota.find({ especie: 'Perro', comuna: comuna, vacunacion: 'Si' }).countDocuments();
            const perroNo = await Mascota.find({ especie: 'Perro', comuna: comuna, vacunacion: 'No' }).countDocuments();
            const gatoSi = await Mascota.find({ especie: 'Gato', comuna: comuna, vacunacion: 'Si' }).countDocuments();
            const gatoNo = await Mascota.find({ especie: 'Gato', comuna: comuna, vacunacion: 'No' }).countDocuments();

            res.json({
                perroSi,
                perroNo,
                gatoSi,
                gatoNo,

            });
            break;
        case 'Estado actual':
            const perroV = await Mascota.find({ especie: 'Perro', comuna: comuna, estado: 'Vivo' }).countDocuments();
            const perroF = await Mascota.find({ especie: 'Perro', comuna: comuna, estado: 'Muerto' }).countDocuments();
            const perroP = await Mascota.find({ especie: 'Perro', comuna: comuna, estado: 'Perdido' }).countDocuments();
            const perroAd = await Mascota.find({ especie: 'Perro', comuna:comuna, estado: 'En Adopción' }).countDocuments();
            const gatoV = await Mascota.find({ especie: 'Gato', comuna: comuna, estado: 'Vivo' }).countDocuments();
            const gatoF = await Mascota.find({ especie: 'Gato', comuna: comuna, estado: 'Muerto' }).countDocuments();
            const gatoP = await Mascota.find({ especie: 'Gato', comuna: comuna, estado: 'Perdido' }).countDocuments();
            const gatoAd = await Mascota.find({ especie: 'Gato', comuna: comuna, estado: 'En Adopción' }).countDocuments();

            res.json({
                perroV,
                perroF,
                perroP,
                perroAd,
                gatoV,
                gatoF,
                gatoP,
                gatoAd,
            });
            break;
        default:
            console.log(`Sorry, we are out of ${consulta}.`);
    }
}

// Funcion nueva

const getData = async (req, res = response) => {

    const consulta = req.query.consulta
    var comunas = [];
    var comunaR = []
    var query = { comuna: /^Comuna/ };
    const perroxcomunaT = await Mascota.find(query)
    perroxcomunaT.forEach(element => {
        const result = element.comuna
        comunas.push(result)
    });
    let filtroComunas = comunas.filter((item, index) => {
        return comunas.indexOf(item) === index;
    })
    const resultado = []
    switch (consulta) {
        
        case 'Tipo de mascota':
            
            for (var i = 0; i < filtroComunas.length; i++) {
                const perro = await Mascota.find({ especie: 'Perro', comuna: filtroComunas[i] }).countDocuments();
                const gato = await Mascota.find({especie: 'Gato', comuna: filtroComunas[i] }).countDocuments();
                resultado.push({ comuna: filtroComunas[i], perro: perro, gato: gato })
              
            }
            res.json(
                resultado
            );
            break;

        case 'Sexo':
            
            for (var i = 0; i < filtroComunas.length; i++) {
                const perroM = await Mascota.find({ especie: 'Perro', comuna: filtroComunas[i], sexo: 'Macho' }).countDocuments();
                const perroH = await Mascota.find({ especie: 'Perro', comuna: filtroComunas[i], sexo: 'Hembra' }).countDocuments();
                const gatoM = await Mascota.find({ especie: 'Gato', comuna: filtroComunas[i], sexo: 'Macho' }).countDocuments();
                const gatoH = await Mascota.find({ especie: 'Gato', comuna: filtroComunas[i], sexo: 'Hembra' }).countDocuments();
                resultado.push({ comuna: filtroComunas[i], perroM: perroM, perroH: perroH, gatoM: gatoM, gatoH: gatoH })

            }
            res.json(
                resultado
            );
            break;
        case 'Adquisición':
            
            for (var i = 0; i < filtroComunas.length; i++) {
                const perroC = await Mascota.find({ especie: 'Perro', comuna: filtroComunas[i], adquisicion: 'Compra' }).countDocuments();
                const perroA = await Mascota.find({ especie: 'Perro', comuna: filtroComunas[i], adquisicion: 'Adopción' }).countDocuments();
                const gatoC = await Mascota.find({ especie: 'Gato', comuna: filtroComunas[i], adquisicion: 'Compra' }).countDocuments();
                const gatoA = await Mascota.find({ especie: 'Gato', comuna: filtroComunas[i], adquisicion: 'Adopción' }).countDocuments();
                resultado.push({ comuna: filtroComunas[i], perroC: perroC, perroA: perroA, gatoC: gatoC, gatoA: gatoA })

            }
            res.json(
                resultado
            );
            break;
        case 'Esterilización':
            
            for (var i = 0; i < filtroComunas.length; i++) {
                const perroS = await Mascota.find({ especie: 'Perro', comuna: filtroComunas[i], esterilizacion: 'Si' }).countDocuments();
                const perroN = await Mascota.find({ especie: 'Perro', comuna: filtroComunas[i], esterilizacion: 'No' }).countDocuments();
                const gatoS = await Mascota.find({especie: 'Gato', comuna: filtroComunas[i], esterilizacion: 'Si' }).countDocuments();
                const gatoN = await Mascota.find({ especie: 'Gato', comuna: filtroComunas[i], esterilizacion: 'No' }).countDocuments();
                resultado.push({ comuna: filtroComunas[i], perroS: perroS, perroN: perroN, gatoS: gatoS, gatoN: gatoN })

            }
            res.json(
                resultado
            );
            break;
        case 'Esquema de vacunación':
           
            for (var i = 0; i < filtroComunas.length; i++) {
                const perroS = await Mascota.find({ especie: 'Perro', comuna: filtroComunas[i], vacunacion: 'Si' }).countDocuments();
                const perroN = await Mascota.find({ especie: 'Perro', comuna: filtroComunas[i], vacunacion: 'No' }).countDocuments();
                const gatoS = await Mascota.find({ especie: 'Gato', comuna: filtroComunas[i], vacunacion: 'Si' }).countDocuments();
                const gatoN = await Mascota.find({ especie: 'Gato', comuna: filtroComunas[i], vacunacion: 'No' }).countDocuments();
                resultado.push({ comuna: filtroComunas[i], perroS: perroS, perroN: perroN, gatoS: gatoS, gatoN: gatoN })

            }
            res.json(
                resultado
            );
            break;
        case 'Tipo de Alimentación':
           
            for (var i = 0; i < filtroComunas.length; i++) {
                const perroCO = await Mascota.find({ especie: 'Perro', comuna: filtroComunas[i], tipoAlimentacion: 'Concentrado' }).countDocuments();
                const perroCA = await Mascota.find({ especie: 'Perro', comuna: filtroComunas[i], tipoAlimentacion: 'Casero' }).countDocuments();
                const gatoCO = await Mascota.find({ especie: 'Gato', comuna: filtroComunas[i], tipoAlimentacion: 'Concentrado' }).countDocuments();
                const gatoCA = await Mascota.find({ especie: 'Gato', comuna: filtroComunas[i], tipoAlimentacion: 'Casero' }).countDocuments();
                resultado.push({ comuna: filtroComunas[i], perroCO: perroCO, perroCA: perroCA, gatoCO: gatoCO, gatoCA: gatoCA })
            }
            
            res.json(
                resultado
            );
            break;

            case 'Estado actual':
           
            for (var i = 0; i < filtroComunas.length; i++) {
                const perroVivo = await Mascota.find({ especie: 'Perro', comuna: filtroComunas[i], estado: 'Vivo' }).countDocuments();
                const perroMuerto = await Mascota.find({ especie: 'Perro', comuna: filtroComunas[i], estado: 'Muerto' }).countDocuments();
                const perroPerdido = await Mascota.find({ especie: 'Perro', comuna: filtroComunas[i], estado: 'Perdido' }).countDocuments();
                const perroAdopcion = await Mascota.find({ especie: 'Perro', comuna: filtroComunas[i], estado: 'En Adopción' }).countDocuments();
                const gatoVivo = await Mascota.find({ especie: 'Gato', comuna: filtroComunas[i], estado: 'Vivo' }).countDocuments();
                const gatoMuerto = await Mascota.find({ especie: 'Gato', comuna: filtroComunas[i], estado: 'Muerto' }).countDocuments();
                const gatoPerdido = await Mascota.find({ especie: 'Gato', comuna: filtroComunas[i], estado: 'Perdido' }).countDocuments();
                const gatoAdopcion = await Mascota.find({ especie: 'Gato', comuna: filtroComunas[i], estado: 'En Adopción' }).countDocuments();
                resultado.push({ comuna: filtroComunas[i], perroVivo: perroVivo, perroMuerto: perroMuerto, perroPerdido: perroPerdido, perroAdopcion: perroAdopcion,
                                                            gatoVivo: gatoVivo, gatoMuerto: gatoMuerto, gatoPerdido: gatoPerdido, gatoAdopcion: gatoAdopcion  })
            }
            
            res.json(
                resultado
            );
            break;

        default:
            console.log(`Error ${consulta}.`);
    }
}
module.exports = {
    getDatas,
    getData
}


