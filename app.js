var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    flash           = require("connect-flash"),
    passport        = require("passport"),
    LocalStrategy   = require("passport-local"),
    methodOverride  = require("method-override"),
    expressSanitizer= require("express-sanitizer"),
    Comment         = require("./models/comment"),
    Game            = require("./models/games"),
    User            = require("./models/user"),
    seedDB          = require("./seeds.js");
    
    var commentRoutes = require("./routes/comments"),
        gameRoutes    = require("./routes/games"),
        authRoutes    = require("./routes/index");

mongoose.connect(process.env.DATABASEURL);
//mongoose.connect("mongodb://collin.desoto:Eclipse99$@ds129043.mlab.com:29043/gamingblog");
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.use(methodOverride("_method"));
app.use(flash());

//seedDB();

//******************************************************************************
// PASSPORT CONFIG
//******************************************************************************
app.use(require("express-session")({
    secret: "Chewy is the best dog ever",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
//******************************************************************************

app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   res.locals.error = req.flash("error");
   res.locals.success = req.flash("success");
   next();
});

app.use(authRoutes);
app.use(commentRoutes);
app.use(gameRoutes);

app.get("*", function(req, res){
    res.redirect("/games");
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server is listening!");
});