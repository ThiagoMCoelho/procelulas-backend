var mongoose = require('mongoose')

var IntegrantesSchema = new mongoose.Schema({
        nome: String,
        email: String,
        datadeNascimento: {type: Date},
        sexo: String,
        FilhosMenoresdeDez: Number,
        membroCarioca: Boolean,
        status: Boolean
});

module.exports = IntegrantesSchema;