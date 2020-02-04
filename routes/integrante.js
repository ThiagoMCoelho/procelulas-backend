var express             = require('express'),
    router              = express.Router(),
    IntegranteModel     = require('../data/models/integrantes');
    CelulaModel         = require('../data/models/celulas')

//get all Integrantes
router.get("/integrantes", function(req, res){
    IntegranteModel.find({}, function(err, integrantes){
        if (err){
            console.log(err);
        }else{
            res.send(integrantes)
        }
    });
});

//get an specific integrante
router.get("/integrantes/:id", function(req, res){
    IntegranteModel.find({_id : req.params.id}, function(err, integrante){
        if (err){
            console.log(err);
        }else{
            res.send(integrante);
        }
    });
});

//get all integrantes of a specific célula
router.get("/integrantes/celula_id", function(req, res){
    CelulaModel.findById(req.params.id, function(err, celula){
        if (err){
            console.log(err);
        }else{
            res.send(celula.integrantes);
        }
    });
});