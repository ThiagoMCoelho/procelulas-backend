var mongoose    = require('mongoose'),
    bcrypt      = require('bcrypt')
//var passportLocalMongoose = require('passport-local-mongoose')

var UserSchema = new mongoose.Schema({
    fullName : {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: true
    },
    hash_password: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now()
    },
    role: {
        type: [String],
        enum: ["Admin", "Lider", "Integrante"],
        default: "Integrante"
    }
    
})

//UserSchema.plugin(passportLocalMongoose);
UserSchema.methods.comparePassword = function(password){
    return bcrypt.compareSync(password, this.hash_password);
}
module.exports = UserSchema;