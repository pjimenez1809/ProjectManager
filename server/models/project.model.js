const mongoose = require('mongoose');

var uniqueValidator = require('mongoose-unique-validator');

const PropertySchema = new mongoose.Schema({
    name: {
        type: String,
        unique   : [true, "Nombre de Proyecto ya existe"],
        required : [true, 'Este es un campo requerido'],
        maxLength: [50, 'No debe excer los 150 caracteres'],
        minLength: [5, 'Nombre de al menos 5 caracteres']
    },
    date_due: {
        type: Date,
        required: [true, 'Este es un campo requerido']
    },

    status: {
        type: String,
        required : [true, 'Este es un campo requerido'],
        default: 'ingresado'
    }
},
{timestamps: true}
);

PropertySchema.plugin(uniqueValidator, { message: 'Error, expected {PATH} to be unique.' });

const Project = mongoose.model('Project', PropertySchema);
module.exports = Project;