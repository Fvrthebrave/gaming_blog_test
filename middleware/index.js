// All middleware goes here
var middlewareObj = {};
var Game = require("../models/games");
var Comment = require("../models/comment");

middlewareObj.checkCampgroundOwnership = function(req, res, next){
    if(req.isAuthenticated()){
            Game.findById(req.params.id, function(err, foundGame){
               if(err){
                   res.redirect("back");
               } else {
                   //does the user own the campground?
                    if(foundGame.author.id .equals(req.user._id)){
                        next(); 
                    } else {
                        res.redirect("back");
                    }
               }
            });
    } else {
        res.redirect("back");
    }
};

middlewareObj.checkCommentOwnership = function(req, res, next){
    if(req.isAuthenticated()){
            Comment.findById(req.params.comment_id, function(err, foundComment){
               if(err){
                   res.redirect("back");
               } else {
                   //does the user own the comment?
                    if(foundComment.author.id.equals(req.user._id)){
                        next(); 
                    } else {
                        res.redirect("back");
                    }
               }
            });
        } else {
            res.redirect("back");
        }
};

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
};



module.exports = middlewareObj;