require("dotenv").config();
var fs = require("fs");
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var axios = require("axios");
var bandsintown = require("bandsintown")(keys.spotify.bandsintown);
//console.log(keys.spotify.bandsintown);
var spotify = new Spotify(keys.spotify);
var moment = require("moment");
moment().format();
//arguments
var p = process.argv;
var arg = p[2];
const v = p[3];

//execute
input(arg, v);

//funk
function input(arg, v) {
  switch (arg) {
    case "spotify-this-song":
      songQuery(v);
      break;
    case "movie-this":
      movieQuery(v);
      break;
    case "concert-this":
      bandQuery(v);
      break;
    case "do-what-it-says":
      makeMe();
      break;
    default:
      console.log(
        "Input one of the following functions with a paramter: \nspotify-this-song \nmovie-this \nconcer-this \ndo-what-it-says"
      );
  }
}

//Spotify Funk
function songQuery(v) {
  let a = p.splice([3]).join("+");

  //default
  if (v === undefined) {
    v = "The Sign";
  }
  spotify
    .search({ type: "track", query: [v, a], limit: 10 })
    .then(function(response) {
      //console.log(response.tracks);
      let song = response.tracks.items;
      for (i = 0; i < song.length; i++) {
        fs.appendFileSync(
          "log.txt",
          "👻👽🐱‍🚀👾✨NEW SPOTIFY QUERY✨👾🐱‍🚀👽👻\n"
        );
        console.log(i);
        fs.appendFileSync("log.txt", i + "\n");
        console.log(song[i].artists[0].name);
        fs.appendFileSync(
          "log.txt",
          "artist: " + song[i].artists[0].name + "\n"
        );
        console.log(song[i].name);
        fs.appendFileSync("log.txt", "song: " + song[i].name + "\n");
        console.log(song[i].preview_url);
        fs.appendFileSync(
          "log.txt",
          "preview url: " + song[i].preview_url + "\n"
        );
        console.log(song[i].album.name);
        fs.appendFileSync("log.txt", "album: " + song[i].album.name + "\n");
      }
    })
    .catch(function(err) {
      console.log(err);
    });
}

function movieQuery(v) {
  //default
  if (v === undefined) {
    v = "Mr. Nobody";
    console.log(
      "If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/"
    );
    fs.appendFileSync(
      "log.txt",
      "If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/" +
        "\n"
    );
    console.log("It's on Netflix!");
    fs.appendFileSync("log.txt", "It's on Netflix!\n");
  }
  //split everytime there is an empty space
  var dataArr = p.splice([3]).join("+");
  // Then run a request with axios to the OMDB API with the movie specified
  var queryUrl = `http://www.omdbapi.com/?t=${dataArr}&y=&plot=short&apikey=trilogy`;
  // helps debug against actual URL.
  //console.log(queryUrl);
  axios
    .get(queryUrl)
    .then(function(response) {
      let mData = response.data;
      //console.log(mData);
      // for (i = 0; i < mData.length; i++) {
      console.log("Movie Title: " + mData.Title);
      console.log("Release Year: " + mData.Released);
      console.log("IMBD Rating: " + mData.imdbRating);
      console.log("Rotten Tomatoes Rating: " + mData.Ratings[1].Value);
      console.log("Country Produced: " + mData.Country);
      console.log("Language: " + mData.Language);
      console.log("Plot: " + mData.Plot);
      console.log("Actors: " + mData.Actors);
      fs.appendFileSync(
        "log.txt",
        "👻👽🐱‍🚀👾✨NEW MOVIE QUERY✨👾🐱‍🚀👽👻\n"
      );
      fs.appendFileSync("log.txt", "Movie Title: " + mData.Title + "\n");
      fs.appendFileSync("log.txt", "Release Year: " + mData.Released + "\n");
      fs.appendFileSync("log.txt", "IMBD Rating: " + mData.imdbRating + "\n");
      fs.appendFileSync(
        "log.txt",
        "Rotten Tomatoes Rating: " + mData.Ratings[1].Value + "\n"
      );
      fs.appendFileSync("log.txt", "Country Produced: " + mData.Country + "\n");
      fs.appendFileSync("log.txt", "Language: " + mData.Language) + "\n";
      fs.appendFileSync("log.txt", "Plot: " + mData.Plot + "\n");
      fs.appendFileSync("log.txt", "Actors: " + mData.Actors + "\n");
      //}
    })
    // Then log the Release Year for the movie

    .catch(function(error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log("---------------Data---------------");
        console.log(error.response.data);
        console.log("---------------Status---------------");
        console.log(error.response.status);
        console.log("---------------Status---------------");
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an object that comes back with details pertaining to the error that occurred.
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
      console.log(error.config);
    });
}

function bandQuery(v) {
  let dataArr = p.splice([3]).join("+");
  let queryUrl = `https://rest.bandsintown.com/artists/${dataArr}/events?app_id=${
    keys.spotify.bandsintown
  }`;
  //console.log(bandsintown);
  axios.get(queryUrl).then(function(response) {
    //console.log(response.data);
    let fu = response.data[0];
    fs.appendFileSync("log.txt", "👻👽🐱‍🚀👾✨NEW BAND QUERY✨👾🐱‍🚀👽👻\n");
    fs.appendFileSync("log.txt", "Lineup: " + fu.lineup[0] + "\n");
    console.log("Venue: " + fu.venue.name);
    fs.appendFileSync("log.txt", "Venue: " + fu.venue.name + "\n");
    let city = fu.venue.city;
    let region = fu.venue.region;
    let country = fu.venue.country;
    console.log(`Location: ${city}, ${region}, ${country}`);
    fs.appendFileSync("log.txt", `Location: ${city}, ${region}, ${country}\n`);
    //dont forget to add venue location
    //console.log(fu.datetime);
    console.log(moment(fu.datetime).format("MM/DD/YYYY"));
    let thyme = moment(fu.datetime).format("MM/DD/YYYY");
    fs.appendFileSync("log.txt", `Date: ${thyme}\n`);
    //console.log(moment().format("MM/DD/YYYY"));
    //console.log(response[i].datetime);
  });
}

function makeMe() {
  fs.readFile("random.txt", "utf8", (err, data) => {
    if (err) throw err;
    console.log(data);
    var dataArr = data.split(",");
    input(dataArr[0], dataArr[1]);
  });
}
