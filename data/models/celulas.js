var mongoose = require('mongoose')
var CelulaSchema = require('../schemas/celulas')
var Celulas = mongoose.model('Celulas', CelulaSchema)
module.exports = Celulas;