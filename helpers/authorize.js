var UserModel = require('../data/models/user');

function authorize (roles = []){
    console.log(roles);
    if (typeof roles === 'string'){
        roles = [roles];
    }

    return [
        (req, res, next) => {
            if (req.user == undefined){
                return res.status(401).send("Usuário não logado!");
            }
            UserModel.findOne({email : req.user.email}, function(err, user){
                if (err){
                    console.log(err)
                    return res.status(401).send("Usuário não encontrado!")
                }
                console.log(roles)
                console.log(userholes)
                if (roles.length && !rolesareequels(roles, user.role)){
                    return res.status(401).send("Usuário sem permissão para acessar este recurso!");
                }
                next(); 
            })
        }
    ]
    
}

//verify if user holes and required roles are the same
function rolesareequels(roles = [], userroles = []){
    var partialResult = true;
    for (var i=0; i < roles.length; i++){
        if (partialResult == false){
            return false
        }
        for (var j=0; j < userroles.length; j++){
            if (roles[i] == userroles[j]){
                partialResult = true;
                continue;
            }else{
                partialResult = false;
            }
        }
    }
    return partialResult
}

module.exports = authorize;
