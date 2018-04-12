require("dotenv").config();
var keys = require("./keys.js");
var request = require("request");
const fs = require("fs");
var inquirer = require("inquirer");

var Spotify = require("node-spotify-api");
var Twitter = require("twitter");

var client = new Twitter(keys.twitter);
var spotify = new Spotify(keys.spotify);


//console.log ("spot: " + spotify + "twit: " + client);

var liriCommand = process.argv[2];
var input = process.argv.splice(3);

//switch case depending on command 

switch (liriCommand) {
	case 'my-tweets':
		myTweets();	
		break;
	case 'spotify-this-song':
		spotifyThisSong(input);
		break;
	case 'movie-this':
		movieThis(process.argv[3]);
		break;
	case 'do-what-it-says':
		fs.readFile('random.txt', 'utf-8',function (err,data) {
			data = data.split(',');
			switch (data[0]) {
				case 'my-tweets':
					myTweets();	
					break;
				case 'spotify-this-song':
					spotifyThisSong(data[1]);
					break;
				case 'movie-this':
					movieThis(data[1]);
					break;
				default:
					console.log('Please type in a valid command...');
			}
		});
		break;
	default:
		console.log('Please type in a valid command...');
}
//myTweets
function myTweets() {
    //get user's screen_name from env
    var user;
    client.get('account/settings', function (err, response) {
        user = response.screen_name;
    });

    //console log 20 most recent tweets and dates 
    console.log('These are your last 20 tweets:');
    client.get('statuses/user_timeline', { screen_name: user, count: 20 }, function (error, tweets, response) {
        if (error) { console.log(error) }
        for (i in tweets) {
            console.log(tweets[i].created_at + '\n' + tweets[i].text);
        }
    });

}


//spotifySong
function spotifyThisSong(name) {
    spotify.search({ type: 'track', query: name, limit: 1 }).then(function (data) {
        console.log('Artist: ' + data.tracks.items[0].artists[0].name);
        console.log('Song: ' + data.tracks.items[0].name);
        console.log('Album: ' + data.tracks.items[0].album.name);
        console.log('Spotify Link: ' + data.tracks.items[0].preview_url);



    }).catch(function (err) {
        console.log("Error encountered so we gave you this:")
        console.log('Artist: Ace of Base');
        console.log('Song: The Sign');
        console.log('Album: The Sign');
    });
}


//movieThis
function movieThis() {
    var url = "http://www.omdbapi.com/?apikey=trilogy"
    //If user doesn't give valid name, use Dunkirk
    process.argv[3] ? url += '&t=' + process.argv[3] : url += '&t=Dunkirk';
    url += '&type=movie';
    request(url, function (err, resp, body) {
        body = JSON.parse(body);
        console.log('Title: ' + body.Title);
        console.log('Year: ' + body.Year);
        console.log('IMDB Rating: ' + body.Ratings[0].Value);
        console.log('Rotten Tomatoes Rating: ' + body.Ratings[1].Value);
        console.log('Countries Produced: ' + body.Country);
        console.log('Languages: ' + body.Language);
        console.log(body.Plot);
        console.log('Actors: ' + body.Actors);
    });

}



