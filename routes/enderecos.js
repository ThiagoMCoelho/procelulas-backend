var express = require('express')
var router = express.Router()
var EnderecosModel = require('../data/models/enderecos')

router.get("/enderecos", function(req, res){
    EnderecosModel.find({}, function(err, enderecos){
        if (err){
            console.log(err)
        }else{
            res.send(enderecos)
        }
    })
})

module.exports = router;