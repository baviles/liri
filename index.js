// storing enviornment cookies
require("dotenv").config();

// calling keys folder for api 
var keys = require('./keys.js');

// node-spotify-api NPM package
var Spotify = require("node-spotify-api");

// NPM spotify api keys 
// console.log(keys);
var spotify = new Spotify(keys.spotify);


// NPM packages: axios,moment, fs 

var axios = require("axios")

var moment = require("moment")

var fs = require("fs");



// node.js process to grab the command and value when its being called
var command = process.argv[2];
var value = process.argv[3];

// else if statements

switch (command) {
  case "concert-this":
    getMyConcert(value);
    break;
  case "spotify-this-song":
    getMySpotify(value);
    break;
  case "movie-this":
    getMyMovie(value);
    break;
  case "do-what-it-says":
    doWhatItSays(value);
    break;
  default:
    console.log("SIRI knows that, but LIRI doesn't know that");
};

// spotify search function
function getMySpotify (songName) {
  if (songName === undefined) {
    songName = "hey buddy Try again"
  }

  spotify.search(
    {
      type: "track",
      query: songName
    },
    function (err, data) {
      if (err) {
        console.log('Error occurred: ' + err);
        return;
      }

      var songs = data.tracks.items;

      for (var i = 0; i < songs.length; i++) {
        console.log(i);
        console.log("song name: " + songs[i].name);
        console.log("album: " + songs[i].album.name);
        console.log("preview song:" + songs[i].preview_url);
        console.log("--------------------------------");

      }
    }
  );
};

// pulls up concert information 
function getMyConcert(value) {
  axios.get("https://rest.bandsintown.com/artists/" + value + "/events?app_id=codingbootcamp")
    .then(function (response) {
      for (var i = 0; i < response.data.length; index++) {

        var datetime = response.data[i].datetime;
        var dateArr = datetime.split("T");

        var concertResults =
          "--------------------------------------------" +
          "\nVenue Name: " + response.data[i].venue.name +
          "\nVenue Location:" + response.data[i].venue.city +
          "\nDate of the Event:" + moment(dateArr[0], "MM-DD-YYYY");
        console.log(concertResults);

      }
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  // gets the movie information 
  
  function getMyMovie(value) {
    if (!value) {
      value = "Mr Nobody";
    }
    axios.get("https://www.omdbapi.com/?t=" + value + "&y=&plot=short&apikey=trilogy")
      .then(function (response) {
        // console.log(response.data.Ratings)
        var movieResponses = "----------------------------------" +
        "\nMovie Title:" + response.data.Title +
          "\nYear of Release:" + response.data.Year +
          "\nIMDB Rating:" + response.data.imdbRating +
          "\nRotten Tomatoes Rating: " + response.data.Ratings[0].Value +
          "\nCountry Produced: " + response.data.Country +
          "\nLanguage: " + response.data.Language +
          "\nPlot: " + response.data.Plot +
          "\nActors/Actresses: " + response.data.Actors;
        console.log(movieResponses);
      })

      .catch(function (error) {
        console.log(error);
      });
  }

  function doWhatItSays(value) {

    fs.readFile("random.txt", "utf8", function (error, data) {
      if (error) {
        return console.log(error);
      }
      var dataArr = data.split(',');
      getMySpotify(value);
      (data[0], data[1]);
    })
  }