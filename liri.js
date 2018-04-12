var dotenv = require("dotenv").config();
var keys = require("./keys.js");
var request = require("request");

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

console.log ("spot: " + spotify + "twit: " + client);

var liriCommand = process.argv[2];
var input = process.argv.splice(2);

//switch case depending on command 
switch (command){
    case "my-tweets":
    myTweets();

    case "spotify-this-song":
    spotifySong();

    case "movie-this":
    movieThis();

    case "do-what-it-says":
    doItSays();
}

//myTweets
function myTweets(){

}


//spotifySong
function spotifySong(){

}


//movieThis
function movieThis(){

}


//doItSays
function doItSays(){

}

