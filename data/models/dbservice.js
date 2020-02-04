var IntegranteModel     = require('../models/integrantes'),
    CelulaModel         = require('../models/celulas'),
    EnderecoModel       = require('../models/enderecos'),
    UserModel           = require('../models/user'),
    bcrypt              = require('bcrypt'),
    Role                = require('../models/enums/Roles'),
    mongoose            = require('mongoose');

var newSenha = bcrypt.hashSync("senha", 10);

var newUser1 = new UserModel({
    fullName : "Thiago Coelho",
    email: "gpcoelho@gmail.com",
    hash_password: newSenha,
    role : Role.Lider
});
var newUser2 = new UserModel({
    fullName : "Elaine Coelho",
    email: "admelainecoelho@gmail.com",
    hash_password: newSenha,
    role : [Role.Lider, Role.Admin]
});

UserModel.deleteMany({}, function(err){
    if (err){
        console.log(err + " erro ao deletar ususário!");
    }
    newUser1.save(function(err, user){
        if (err){
            console.log(err + " erro ao criar usuário!");
        }
        
    });
    newUser2.save(function(err, user){
        if (err){
            console.log(err + " erro ao criar usuário!");
        }
        
    });
    
});

EnderecoModel.deleteOne({}, function(err){
        if (err){
            console.log(err);
        }
        EnderecoModel.create({
            logradouro: "Rua do nada",
            numero: "456",
            complemento: "casa",
            bairro: "por aí",
            cidade: "Rio de Janeiro",
                estado: "Rio de Janeiro"
        }, function(err, endereco){
            if (err){
                console.log(err)
            }
        });
});

CelulaModel.deleteOne({}, function(err){
    if (err){
        console.log(err)
    }
    CelulaModel.create({
        _id : mongoose.Types.ObjectId("amarela"),
        nome: "Amarela",
        endereco: {
        logradouro: "Rua do nada",
        numero: "1000",
        complemento: "sem apt",
        bairro: "Meier",
        cidade: "Rio de Janeiro",
        estado: "Rio de Janeiro"
        },
        lider: newUser1,
        status: true
    }, function(err, celula){
        console.log(err);
        IntegranteModel.deleteOne({}, function(err){
            if (err){
                console.log(err)
            }
            IntegranteModel.create([
                {
                    nome: "Thiago Coelho",
                    email: "gpcoelho@gmail.com",
                    datadeNascimento: Date.parse("04/22/1982"),
                    sexo: "masculino",
                    FilhosMenoresdeDez: 1,
                    membroCarioca: true,
                    status: true
                },
                {
                    nome: "Fulano de tal",
                    email: "fulano@detal.com",
                    datadeNascimento: Date.parse("05/14/1982"),
                    sexo: "feminino",
                    FilhosMenoresdeDez: 2,
                    membroCarioca: false,
                    status: false
                }
            ], function(err, integrantes){
                celula.integrantes.push({$each : integrantes});
                celula.save(function(err, celula){
                    if (err){
                        console.log(err);
                    }
                });

            });
        });
    });
});


//module.exports.criarEndereco = criarEndereco;