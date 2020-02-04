var mongoose = require('mongoose')
var EnderecosSchema = require('../schemas/enderecos')
var Enderecos = mongoose.model('Enderecos', EnderecosSchema)
module.exports = Enderecos;