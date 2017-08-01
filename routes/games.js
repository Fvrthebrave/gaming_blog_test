var express = require("express");
var router  = express.Router();
var Game    = require("../models/games");
var middleware = require("../middleware");


// INDEX ROUTE

router.get("/games", function(req, res){
    //Get all games from DB
    Game.find({}, function(err, gamesList){
        if(err){
            console.log('An error has occurred!');
        } else {
            res.render("games/index", {games: gamesList});
        }
    });
});

// NEW ROUTE

router.get("/games/new", middleware.isLoggedIn, function(req, res){
   res.render("games/new"); 
});

//CREATE ROUTE

router.post("/games", middleware.isLoggedIn, function(req, res){
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var title = req.body.title;
    var image = req.body.image;
    var body = req.body.body;
    
    var newGame = {title: title, image: image, body: body, author: author};
    Game.create(newGame, function(err, newGame){
       if(err){
           console.log(err);
       } else {
           console.log(newGame);
           res.redirect("/games");
       }
   }) ;
});

// SHOW ROUTE

router.get("/games/:id", function(req, res){
    Game.findById(req.params.id).populate("comments").exec(function(err, foundGame){
        if(err){
            console.log(err);
        } else {
            res.render("games/show", {game: foundGame});
        }
    });
});

// EDIT ROUTE

router.get("/games/:id/edit", middleware.checkCommentOwnership, function(req, res){
    Game.findById(req.params.id, function(err, foundGame){
        res.render("edit", {game: foundGame});
    });
});

// UPDATE ROUTE

router.put("/games/:id", middleware.checkCommentOwnership, function(req, res){
    req.body.game.body = req.sanitize(req.body.game.body);
    Game.findByIdAndUpdate(req.params.id, req.body.game, function(err){
       if(err){
           res.redirect("/games");
       } else {
           res.redirect("/games/" + req.params.id);
       }
    });
});

// DELETE ROUTE

router.delete("/games/:id", middleware.checkCommentOwnership, function(req, res){
   Game.findByIdAndRemove(req.params.id, function(err){
       if(err){
           res.redirect("/games");
       } else {
           res.redirect("/games");
       }
   }) ;
});

module.exports = router;