const {Schema,model} = require('mongoose');

const EmpresaSchema = Schema({

    nombreEmpresa:{
        type: String,
        requird: true
    },

    NIT:{
        type: double,
        requird: true
    },

    sector:{
        type: String,
        requird: true
    },

    representanteLegal:{
        type: String,
        requird: true
    },

    telefono:{
        type: int,
        requird: true
    },

    comuna:{
        type: int,
        requird: true
    },

    direccion:{
        type: String,
        requird: true
    },

    correoElectronico:{
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
        default: 'EMPRESA_ROLE'
    
    }
});

module.exports = model('Empresa', EmpresaSchema)