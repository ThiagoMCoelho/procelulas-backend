var express = require('express');
var router = express.Router();
var ReuniaoModel = require('../data/models/reuniao')

//get all reuniões
router.get("/", function(req, res){
    ReuniaoModel.find({}, function(err, reunioes){
        if (err){
            console.log(err);
        }else{
            res.send(reunioes);
        }
    });
});

//get an specific reunião!
router.get("/:id", function(req, res){
    ReuniaoModel.findById(req.params.id, function(err, reuniao){
        if(err){
            console.log(err);
        }else{
            res.send(reuniao);
        }
    });
});

//gel all reunioes of an specific célula
router.get("/:celula_id", function(req, res){
    ReuniaoModel.find({celula: {_id : req.params.celula_id}}, function(err, reunioes){
        if (err){
            console.log(err);
        }else{
            res.send(reunioes);
        }
    });
});

//create an reunião!
router.post("/", function(req, res){
    console.log(req.body.reuniao);
    ReuniaoModel.create(req.body.reuniao, function(err, reuniao){
        if (err){
            console.log(err);
        }else{
            res.send(reuniao);
        }
    });
});

module.exports = router;