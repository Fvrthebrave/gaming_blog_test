var mongoose = require("mongoose");
var Game     = require("./models/games");
var Comment  = require("./models/comment");

var data = [
    {
        // Referred to as "seed" in forEach loop below
        title: "World of Warcraft",
        image: "https://us.battle.net/forums/static/images/game-logos/game-logo-wow.png",
        body: "8/10 Rating"
    },
    {
        // Referred to as "seed" in forEach loop below
        title: "Player Unknown's Battlegrounds",
        image: "https://geekreply.com/wp-content/uploads/2017/07/PUBGwall.jpg",
        body: "9/10 Rating"
    }
];

function seedDB(){
    Game.remove({}, function(err){
        if(err){
            console.log(err);
        } else {
            console.log("Removed all games!");
        }
            
    //         // Add initial games
    //         data.forEach(function(seed){
    //             Game.create(seed, function(err, game){
    //                 if(err){
    //                     console.log(err);
    //                 } else {
    //                     console.log("Added game!");
                        
    //                     // Create an initial comment
    //                     Comment.create(
    //                         {
    //                             text: "Great game!",
    //                             author: "Collin DeSoto"
    //                         }, function(err, comment){
    //                         if(err){
    //                             console.log(err);
    //                         } else {
    //                             game.comments.push(comment);
    //                             game.save();
    //                             console.log("Added new game!");
    //                         }
    //                     });
    //                 }
    //             });
    //         });
    //     }
    // });
    });
}

module.exports = seedDB;