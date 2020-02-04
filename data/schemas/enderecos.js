var mongoose = require('mongoose')

var EnderecosSchema = new mongoose.Schema({
    logradouro: String,
    numero: String,
    complemento: String,
    bairro: String,
    cidade: String,
    estado: String
});

module.exports = EnderecosSchema;