var mongoose = require('mongoose')
var EnderecoSchema = require('./enderecos')
var IntegranteSchema = require('./integrantes')

var CelulaSchema = new mongoose.Schema({
    nome: String,
    endereco: EnderecoSchema,
    diadeReuniao: {type:Date, default: Date.now()},
    horariodeReuniao: {type:Date, default: Date.now()},
    integrantes: [IntegranteSchema],
    lider: IntegranteSchema,
    colider: IntegranteSchema,
    status: Boolean
});

module.exports = CelulaSchema;