require("dotenv").config();


var keys = require("./keys.js");
var request = require("request");
var fs = require("fs");
var action = process.argv[2];
var userInput = process.argv.slice(3).join("+");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var moment = require("moment");

switch(action) {

    case "concert-this": {
        
    }
    break;
    
    case "spotify-this-song":
    if (userInput) {
        spotifySong(userInput);
    }
    else {
        spotifySong("The Sign")
    }
    break;

    case "movie-this":
    if (userInput) {
        omdbData(userInput);

    }
    else {
        omdbData("Mr.Nobody")
    }
    break;

    case "do-what-it-says": {
        doThing();
    }
    
    default:
    console.log("{Enter a command: concert-this, spotify-this-song, movie-this, do-what-it-says}");
}

function spotifySong(song){
    spotify.search({ type: 'track', query: song}, function(error, data){
      if(!error){
        for(var i = 0; i < data.tracks.items.length; i++){
          var songData = data.tracks.items[i];
          //artist
          console.log("Artist: " + songData.artists[0].name);
          //song name
          console.log("Song: " + songData.name);
          //spotify preview link
          console.log("Preview URL: " + songData.preview_url);
          //album name
          console.log("Album: " + songData.album.name);
          console.log("-----------------------");
          
          //adds text to log.txt
          fs.appendFile('log.txt', songData.artists[0].name);
          fs.appendFile('log.txt', songData.name);
          fs.appendFile('log.txt', songData.preview_url);
          fs.appendFile('log.txt', songData.album.name);
          fs.appendFile('log.txt', "-----------------------");
        }
      } else{
        console.log('Error occurred.');
      }
    });
  }

  function omdbData(movie){
    var omdbURL = 'http://www.omdbapi.com/?t=' + movie + '&plot=short&tomatoes=true';
  
    request(omdbURL, function (error, response, body){
      if(!error && response.statusCode == 200){
        var body = JSON.parse(body);
  
        console.log("Title: " + body.Title);
        console.log("Release Year: " + body.Year);
        console.log("IMdB Rating: " + body.imdbRating);
        console.log("Country: " + body.Country);
        console.log("Language: " + body.Language);
        console.log("Plot: " + body.Plot);
        console.log("Actors: " + body.Actors);
        console.log("Rotten Tomatoes Rating: " + body.tomatoRating);
        console.log("Rotten Tomatoes URL: " + body.tomatoURL);
  
        //adds text to log.txt
        fs.appendFile('log.txt', "Title: " + body.Title);
        fs.appendFile('log.txt', "Release Year: " + body.Year);
        fs.appendFile('log.txt', "IMdB Rating: " + body.imdbRating);
        fs.appendFile('log.txt', "Country: " + body.Country);
        fs.appendFile('log.txt', "Language: " + body.Language);
        fs.appendFile('log.txt', "Plot: " + body.Plot);
        fs.appendFile('log.txt', "Actors: " + body.Actors);
        fs.appendFile('log.txt', "Rotten Tomatoes Rating: " + body.tomatoRating);
        fs.appendFile('log.txt', "Rotten Tomatoes URL: " + body.tomatoURL);
  
      } else{
        console.log('Error occurred.')
      }
      if(movie === "Mr. Nobody"){
        console.log("-----------------------");
        console.log("If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/");
        console.log("It's on Netflix!");
  
        //adds text to log.txt
        fs.appendFile('log.txt', "-----------------------");
        fs.appendFile('log.txt', "If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/");
        fs.appendFile('log.txt', "It's on Netflix!");
      }
    });
  
  }

  function concertThis() {

    var concertURL = ("https://rest.bandsintown.com/artists/" + userInput + "/events?app_id=codingbootcamp")
    request(concertURL, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            console.log("\n---------------------------------\n")
            console.log("Venue: " + JSON.parse(body)[0].venue.name);
            console.log("Location: " + JSON.parse(body)[0].venue.city + ", " + JSON.parse(body)[0].venue.country);
            console.log("Event Date: " + moment(body[0].datetime).format("MM/DD/YYYY"));
            console.log("\n---------------------------------\n")
        }
    });
}
  
  function doThing(){
    fs.readFile('random.txt', "utf8", function(error, data){
      var txt = data.split(',');
  
      spotifySong(txt[1]);
    });
  }