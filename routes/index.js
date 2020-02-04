var express         = require('express'),
    router          = express.Router(),
    passport        = require('passport'),
    UserModel       = require('../data/models/user'),
    bcrypt          = require('bcrypt'),
    jwt             = require('jsonwebtoken');


router.post("/register", function(req,res){
    var newUser = new UserModel(req.body)
    newUser.hash_password = bcrypt.hashSync(req.body.password, 10)
    newUser.save(function(err, user){
        if (err){
            return res.status(400).send(err)
        }else{
            user.hash_password = undefined;
            res.send(user);
        }
    })
    //session configuration
    // var newUser = new UserModel({username : req.body.username});
    // UserModel.register(newUser, req.body.password, function(err, user){
    //     if (err){
    //         console.log(err);
    //         return res.send("/register")
    //     }
    //     passport.authenticate("local")(req, res, function(){
    //         res.redirect("/celulas");
    //     });
    // });
})

router.get("/login", function(req,res){
    res.send("LOGIN!");
});

//jwt configuration
router.post("/login", function(req, res){
    UserModel.findOne({email : req.body.email}, function(err, user){
        if (err) throw err;
        if (!user){
            res.status(401).json({message : "Usuário não encontrado"});
        }else{
            if (user.comparePassword(req.body.password)){
                var jwtoken = jwt.sign({
                    email : req.body.email,
                    fullName : req.body.fullName,
                    _id : req.body._id,
                    roles : req.body.roles
                }, 'chavesecretapacas');
                res.set('authorization', "Bearer " + jwtoken);
                res.sendStatus(200);
            }else{
                res.status(401).send("Falha na autenticação. Senha incorreta!");
            }
        }
    });
});

//session configuration
// router.post("/login", passport.authenticate("local",
//     {
//         successRedirect: "/celulas",
//         failureRedirect: "/"
//     }
// ), function(req, res){
// });


module.exports = router;