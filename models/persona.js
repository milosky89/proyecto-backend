const {Schema,model} = require('mongoose');


const PersonaSchema = Schema({

    nombre:{
        type: String,
        required: true
    },

    apellido:{
        type: String,
        required: true
    },

    tipoDocumento:{
        type: String,
        required: true
    },

    numeroDocumento:{
        type: String,
        required: true
    },

    celular:{
        type: String,
        required: true
    },

    tipoUsuario:{
        type: String,
        required: true
    },

    email:{
        type: String,
        required: true,
        unique: true
    },

    clave:{
        type: String,
        required: true,
    },

    img:{
        type: String,
    },

    role: {
        type: String,
        required: true,
        //default: 'USER_ROLE'
    },

    estado: {
        type: String,
        required: true,
        default: 'Activo'
    }

});

PersonaSchema.method('toJSON', function() {
    const { __v, clave,_id,  ...object} = this.toObject();
    object.uid = _id;
    return object;
})

module.exports = model('Persona', PersonaSchema)