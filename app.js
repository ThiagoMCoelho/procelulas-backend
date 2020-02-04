var mongoose                = require('mongoose'),
    express                 = require('express'),
    app                     = express(),
    passport                = require('passport'),
    localStrategy           = require('passport-local'),
    passportLocalMongoose   = require('passport-local-mongoose'),
    DbService               = require('./data/models/dbservice'),
    User                    = require('./data/models/user'),
    bodyParser              = require('body-parser'),

    CelulasRouter           = require('./routes/celulas'),
    EnderecosRouter         = require('./routes/enderecos'),
    IndexRouter             = require('./routes/index'),
    ReuniaoRouter           = require('./routes/reuniao'),
    jsonwebtoken            = require('jsonwebtoken');

//passport configuration
// app.use(require('express-session')({
//     secret: "qualquer coisa secreta pacas",
//     saveUninitialized: false,
//     resave: false
// }));
// app.use(passport.initialize());
// app.use(passport.session());
// passport.use(new localStrategy(User.authenticate()));
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

//configure bodyParse to URLEncoded and json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))

app.get("/", function(req, res){
    res.send("Welcome!!!")
});

//ensure that middleware runs before routes
app.use(
    function(req, res, next){
        if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === "Bearer"){
            jsonwebtoken.verify(req.headers.authorization.split(' ')[1], 'chavesecretapacas', function(err, decode){
                if (err) req.user = undefined
                User.findOne({email : decode.email}, function(err, user){
                    if (err){
                        res.status(401).send(err);
                    }else{
                        req.user = user;
                    }
                })
                req.user = decode;
                next()
            })
        }else{
            req.user = undefined;
            next();
        }
    }
)

var uri = "mongodb://localhost:27017/procelulasData";

mongoose.connect(uri, {useNewUrlParser:    true,
                       useUnifiedTopology: true});

app.use("/celulas", CelulasRouter);
app.use("/enderecos", EnderecosRouter);
app.use(IndexRouter);
app.use("/reunioes", ReuniaoRouter);

app.listen(3000, function(){
    console.log("Serving on port 3000!")
});