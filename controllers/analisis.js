const { response } = require('express');

const Persona = require('../models/persona')
const Mascota = require('../models/mascota');
const mascota = require('../models/mascota');



// funcion utilizada

const getDatas = async (req, res = response) => {
    const comuna = req.query.comuna
    const consulta = req.query.consulta
    switch (consulta) {
        case 'Tipo de mascota':
            const perro = await Mascota.find({ especie: 'Perro', comuna: comuna }).countDocuments();
            const gato = await Mascota.find({ especie: 'Gato', comuna: comuna }).countDocuments();
            const totalMascotas = await Mascota.where({ especie: { $in: ['Perro', 'Gato'] },  comuna: comuna }).countDocuments();

            res.json({
                perro,
                gato,
                totalMascotas
            });
            break;
        case 'Tipo de Alimentación':
            const perro_concentrado = await Mascota.find({ especie: 'Perro', comuna: comuna, tipoAlimentacion: 'Concentrado' }).countDocuments();
            const perroCA = await Mascota.find({ especie: 'Perro', comuna: comuna, tipoAlimentacion: 'Casero' }).countDocuments();
            const perroMi = await Mascota.find({ especie: 'Perro', comuna: comuna, tipoAlimentacion: 'Mixto' }).countDocuments();
            const gatoCO = await Mascota.find({ especie: 'Gato', comuna: comuna, tipoAlimentacion: 'Concentrado' }).countDocuments();
            const gatoCA = await Mascota.find({ especie: 'Gato', comuna: comuna, tipoAlimentacion: 'Casero' }).countDocuments();
            const gatoMi = await Mascota.find({ especie: 'Gato', comuna: comuna, tipoAlimentacion: 'Mixto' }).countDocuments();

            const totalConcentrado = await Mascota.find({ especie: { $in: ['Perro', 'Gato'] },  comuna: comuna, }).where({tipoAlimentacion: 'Concentrado'}).countDocuments();
            const totalCasero = await Mascota.find({ especie: { $in: ['Perro', 'Gato'] },  comuna: comuna, }).where({tipoAlimentacion: 'Casero'}).countDocuments();
            const totalmixto = await Mascota.find({ especie: { $in: ['Perro', 'Gato'] },  comuna: comuna, }).where({tipoAlimentacion: 'Mixto'}).countDocuments();
            
            res.json({
                perro_concentrado,
                perroCA,
                perroMi,
                gatoCO,
                gatoCA,
                gatoMi,
                totalConcentrado,
                totalCasero,
                totalmixto
                
            });
            break;
        case 'Sexo':
            const perroM = await Mascota.find({ especie: 'Perro', comuna: comuna, sexo: 'Macho' }).countDocuments();
            const perroH = await Mascota.find({ especie: 'Perro', comuna: comuna, sexo: 'Hembra' }).countDocuments();
            const gatoM = await Mascota.find({ especie: 'Gato', comuna: comuna, sexo: 'Macho' }).countDocuments();
            const gatoH = await Mascota.find({ especie: 'Gato', comuna: comuna, sexo: 'Hembra' }).countDocuments();

            const totalMascotaMacho = await Mascota.find({ especie: { $in: ['Perro', 'Gato'] },  comuna: comuna, }).where({sexo: 'Macho'}).countDocuments();
            const totalMascotaHembra = await Mascota.find({ especie: { $in: ['Perro', 'Gato'] },  comuna: comuna, }).where({sexo: 'Hembra'}).countDocuments();

            res.json({
                perroM,
                perroH,
                gatoM,
                gatoH,
                totalMascotaMacho,
                totalMascotaHembra
            });
            break;
        case 'Adquisición':
            const perroC = await Mascota.find({ especie: 'Perro', comuna: comuna, adquisicion: 'Compra' }).countDocuments();
            const perroA = await Mascota.find({ especie: 'Perro', comuna: comuna, adquisicion: 'Adopción' }).countDocuments();
            const gatoC = await Mascota.find({ especie: 'Gato', comuna: comuna, adquisicion: 'Compra' }).countDocuments();
            const gatoA = await Mascota.find({ especie: 'Gato', comuna: comuna, adquisicion: 'Adopción' }).countDocuments();

            const totalMascotaCompra = await Mascota.find({ especie: { $in: ['Perro', 'Gato'] },  comuna: comuna, }).where({adquisicion: 'Compra'}).countDocuments();
            const totalMascotaAdopcion = await Mascota.find({ especie: { $in: ['Perro', 'Gato'] },  comuna: comuna, }).where({adquisicion: 'Adopción'}).countDocuments();
            res.json({
                perroC,
                perroA,
                gatoC,
                gatoA,
                totalMascotaCompra,
                totalMascotaAdopcion
            });
            break;
        case 'Esterilización':
            const perroS = await Mascota.find({ especie: 'Perro', comuna: comuna, esterilizacion: 'Si' }).countDocuments();
            const perroN = await Mascota.find({ especie: 'Perro', comuna: comuna, esterilizacion: 'No' }).countDocuments();
            const gatoS = await Mascota.find({ especie: 'Gato', comuna: comuna, esterilizacion: 'Si' }).countDocuments();
            const gatoN = await Mascota.find({ especie: 'Gato', comuna: comuna, esterilizacion: 'No' }).countDocuments();

            const totalMascotaEste = await Mascota.find({ especie: { $in: ['Perro', 'Gato'] },  comuna: comuna, }).where({esterilizacion: 'Si'}).countDocuments();
            const totalMascotaNOEste = await Mascota.find({ especie: { $in: ['Perro', 'Gato'] },  comuna: comuna, }).where({esterilizacion: 'No'}).countDocuments();

            res.json({
                perroS,
                perroN,
                gatoS,
                gatoN,
                totalMascotaEste,
                totalMascotaNOEste
            });
            break;
        case 'Esquema de vacunación':
            const perroSi = await Mascota.find({ especie: 'Perro', comuna: comuna, vacunacion: 'Si' }).countDocuments();
            const perroNo = await Mascota.find({ especie: 'Perro', comuna: comuna, vacunacion: 'No' }).countDocuments();
            const gatoSi = await Mascota.find({ especie: 'Gato', comuna: comuna, vacunacion: 'Si' }).countDocuments();
            const gatoNo = await Mascota.find({ especie: 'Gato', comuna: comuna, vacunacion: 'No' }).countDocuments();

            const totalMascotaVacuna = await Mascota.find({ especie: { $in: ['Perro', 'Gato'] },  comuna: comuna, }).where({vacunacion: 'Si'}).countDocuments();
            const totalMascotaNOVacuna = await Mascota.find({ especie: { $in: ['Perro', 'Gato'] },  comuna: comuna, }).where({vacunacion: 'No'}).countDocuments();

            res.json({
                perroSi,
                perroNo,
                gatoSi,
                gatoNo,
                totalMascotaVacuna,
                totalMascotaNOVacuna

            });
            break;
        case 'Estado actual':
            const perroV = await Mascota.find({ especie: 'Perro', comuna: comuna, estado: 'Vivo' }).countDocuments();
            const perroF = await Mascota.find({ especie: 'Perro', comuna: comuna, estado: 'Muerto' }).countDocuments();
            const perroP = await Mascota.find({ especie: 'Perro', comuna: comuna, estado: 'Perdido' }).countDocuments();
            const perroAd = await Mascota.find({ especie: 'Perro', comuna:comuna, estado: 'En Adopción' }).countDocuments();
            const gatoV = await Mascota.find({ especie: 'Gato', comuna: comuna, estado: 'vivo' }).countDocuments();
            const gatoF = await Mascota.find({ especie: 'Gato', comuna: comuna, estado: 'Muerto' }).countDocuments();
            const gatoP = await Mascota.find({ especie: 'Gato', comuna: comuna, estado: 'Perdido' }).countDocuments();
            const gatoAd = await Mascota.find({ especie: 'Gato', comuna: comuna, estado: 'En Adopción' }).countDocuments();

            const totalMascotaVivas = await Mascota.find({ especie: { $in: ['Perro', 'Gato'] },  comuna: comuna, }).where({estado: 'Vivo' }).countDocuments();
            const totalMascotaMuertas = await Mascota.find({ especie: { $in: ['Perro', 'Gato'] },  comuna: comuna, }).where({estado: 'Muerto' }).countDocuments();
            const totalMascotaperdidas = await Mascota.find({ especie: { $in: ['Perro', 'Gato'] },  comuna: comuna, }).where({estado: 'Perdido' }).countDocuments();
            const totalMascotaEnAdopcion = await Mascota.find({ especie: { $in: ['Perro', 'Gato'] },  comuna: comuna, }).where({estado: 'En Adopción' }).countDocuments();
            res.json({
                perroV,
                perroF,
                perroP,
                perroAd,
                gatoV,
                gatoF,
                gatoP,
                gatoAd,
                totalMascotaVivas,totalMascotaMuertas,totalMascotaperdidas,totalMascotaEnAdopcion
            });
            break;
        default:
            console.log(`Sorry, we are out of ${consulta}.`);
    }
}

module.exports = {
    getDatas
}
