var mongoose        = require('mongoose'),
    ReuniaoSchema   = require('../schemas/reuniao'),
    ReuniaoModel    = mongoose.model('Reuniao', ReuniaoSchema);

module.exports = ReuniaoModel;
