const {Schema,model} = require('mongoose');


const PersonaSchema = Schema({

    nombre:{
        type: String,
        requird: true
    },

    apellido:{
        type: String,
        requird: true
    },

    tipoDocumento:{
        type: String,
        requird: true
    },

    numeroDocumento:{
        type: String,
        requird: true
    },

    celular:{
        type: String,
        requird: true
    },

    tipoUsuario:{
        type: String,
        requird: true
    },

    email:{
        type: String,
        requird: true,
        unique: true
    },

    clave:{
        type: String,
        requird: true,

    },

    img:{
        type: String,
    },

    role: {
        type: String,
        require: true,
        default: 'USER_ROLE'
    },

    estado: {
        type: String,
        require: true,
        default: 'Activo'
    }

});

PersonaSchema.method('toJSON', function() {
    const { __v, _id, clave, ...object} = this.toObject();
    object.uid = _id;
    return object;
})

module.exports = model('Persona', PersonaSchema)