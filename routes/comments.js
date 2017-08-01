var express = require("express");
var router  = express.Router();
var Game    = require("../models/games");
var Comment = require("../models/comment");
var middleware = require("../middleware");

//**********************************
// COMMENT ROUTES
//**********************************

// NEW
    //games/:id/comments/new GET
router.get("/games/:id/comments/new", middleware.isLoggedIn, function(req, res){
    Game.findById(req.params.id, function(err, game){
        if(err){
            console.log(err);
        } else {
            res.render("comments/new", {game: game});
        }
    });

});
    
// CREATE
    //games/:id/comments POST
router.post("/games/:id/comments", middleware.isLoggedIn, function(req, res){
   Game.findById(req.params.id, function(err, game){
      if(err){
          req.flash("error", "Something went wrong...");
          console.log(err);
      } else {
          Comment.create(req.body.comment, function(err, comment){
            if(err){
                console.log(err);
            } else {
                
                //add username and id to comment
                comment.author.id = req.user._id;
                comment.author.username = req.user.username;
                
                //save comment
                comment.save();
                
                game.comments.push(comment);
                game.save();
                req.flash("success", "Successfully added comment!");
                res.redirect("/games/" + game._id);
            }   
          });
      }
   });
});

// COMMENT EDIT

router.get("/games/:id/comments/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
    Comment.findById(req.params.comment_id, function(err, foundComment){
        if(err){
            req.flash("error", "Something went wrong...");
            res.redirect("back");
        } else {
            res.render("comments/edit", {game_id: req.params.id, comment: foundComment});
        }
    });
});

// COMMENT UPDATE

router.put("/games/:id/comments/:comment_id", function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if(err){
            req.flash("error", "Something went wrong...");
            res.redirect("back");
        } else {
            req.flash("success", "Successfully updated your comment!");
            res.redirect("/games/" + req.params.id);
        }
    });
});

// COMMENT DESTROY

router.delete("/games/:id/comments/:comment_id", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            req.flash("error", "Something went wrong...");
            res.redirect("back");
        } else {
            req.flash("success", "Successfully removed comment!");
            res.redirect("/games/" + req.params.id);   
        }
    });
});


module.exports = router;