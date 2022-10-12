const fs = require('fs');

const Persona = require('../models/persona');
const Mascota = require('../models/mascota');

const borrarImagen = (path) => {

    
    if( fs.existsSync( path)){
        //borrado de imagen anterior
        fs.unlinkSync(path)
    }
}

const actualizarImagen = async(tipo,id,nombreArchivo) => {

    switch(tipo){
        case 'personas':
            const persona = await Persona.findById(id);
            if(!persona){
                console.log('No es una persona por id');
                return false;
            }

            const pathViejo = `./uploads/personas/${persona.img}`;
            borrarImagen(pathViejo);

            persona.img = nombreArchivo;
            await persona.save();
            return true
            break;

        case 'mascotas':

            const mascota = await Mascota.findById(id);
            if(!mascota){
                console.log('No es una persona por id');
                return false;
            }

            const pathViejo1 = `./uploads/mascotas/${mascota.img}`;
            borrarImagen(pathViejo1);

            mascota.img = nombreArchivo;
            await mascota.save();
            return true
            break;
    }

}

module.exports = {
    actualizarImagen
}