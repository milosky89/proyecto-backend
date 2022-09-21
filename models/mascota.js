const {Schema,model} = require('mongoose');


const MascotaSchema = Schema({

    nombreMascota:{
        type: String,
        required: true
    },

    especie:{
        type: String,
        required: true
    },

    raza:{
        type: String,
        required: true
    },

    sexo:{
        type: String,
        required: true
    },

    microChip:{
        type: String,
        required: true
    },

    fechaNacimiento:{
        type: String,
        required: true,
    },

    vacunacion:{
        type: String,
        required: true,
    },

    direccion:{
        type: String,
        required: true,
    },

    comuna:{
        type: String,
        required: true,
    },

    esterilizacion:{
        type: String,
        required: true,
    },

    habita:{
        type: String,
        required: true,
    },

    tipoAlimentacion:{
        type: String,
        required: true,
    },

    adquisicion:{
        type: String,
        required: true,
    },

    estado: {
        type: String,
        required: true,
        default: 'Activo'
    },

    img:{
        type: String,
    },

    persona: {
        required:true,
        type: Schema.Types.ObjectId,
        ref:'Persona'
    }

});

MascotaSchema.method('toJSON', function() {
    const { __v, ...object} = this.toObject();
    return object;
})

module.exports = model('Mascota', MascotaSchema)