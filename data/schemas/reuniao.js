var mongoose            = require('mongoose'),
    EnderecoSchema      = require('./enderecos'),
    IntegranteSchema    = require('./integrantes'),
    CelulaSchema        = require('./celulas')

var ReuniaoSchema = new mongoose.Schema({
    celula: mongoose.Types.ObjectId,
    local: mongoose.Types.ObjectId,
    horário: {type:Date, default: Date.now()},
    presentes: [mongoose.Types.ObjectId],
    visitantes: [IntegranteSchema]
});

module.exports = ReuniaoSchema;