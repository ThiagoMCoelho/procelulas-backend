var mongoose            = require('mongoose'),
    IntegrantesSchema   = require('../schemas/Integrantes'),
    Integrantes         = mongoose.model('Integrantes', IntegrantesSchema);
    
module.exports = Integrantes;