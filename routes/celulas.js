var express         = require('express'),
    router          = express.Router(),
    CelulasModel    = require('../data/models/celulas'),
    authorize       = require('../helpers/authorize'),
    Role            = require('../data/models/enums/Roles');

//get all celulas
router.get("/", authorize(Role.Admin), function(req, res){
    CelulasModel.find({}, function(err, celula){
        if (err){
            console.log(err)
        }else{
            res.send(celula)
        }
        
    });
});

//get an specific celula
router.get("/:id", authorize(Role.Lider), checkCelulaOwnership, function(req, res){
    CelulasModel.findOne({_id : req.params.id}, function(err, celula){
        if (err){
            console.log(err)
        }else{
            res.send(celula)
        }
        
    });
});

//create an celula
router.post("/", authorize(Role.Admin), function(req, res){
    CelulasModel.create(req.body.celula, function(err, celula){
        if (err){
            console.log(err);
        }else{
            res.send(celula);
        }
    });
});

//router.put();

//router.delete();

function isLoggedIn (req, res, next){
    if (req.user){
        return next();
    }else{
        res.status(401).send("Usuário não autorizado!");
        res.redirect("/")
    }
}

function isLoggedInAndAdministrator (req, res, next){
    if (req.user){
        return next();
    }else{
        res.status(401).send("Usuário não autorizado!");
        res.redirect("/")
    }
}

function checkCelulaOwnership(req, res, next){
    CelulasModel.findOne({_id : req.params.id}, function(err, celula){
        if (err){
            res.status(401).send(err)
        }else{
            console.log(celula.lider._id)
            console.log(req.user.id)
            if (celula.lider._id.equals(req.user._id)){
                next();
            }else{
                res.status(401).send("Usuário não é lider desta célula!");
            }
        }
    })
}

module.exports = router;