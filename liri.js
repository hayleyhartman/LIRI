require("dotenv").config();
var keys = require("./keys");
var request = require('request');
var fs = require("fs");
var Spotify = require('node-spotify-api');
var moment = require('moment')

var spotify = new Spotify(keys.spotify);

var command = process.argv[2]

var concertThis = function (input) {
    var artist = input
    var queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"

    if (!artist) {
        console.log("you didn't enter a band but you should go see Fleetwood Mac on October 26, 2018 in Cleveland.")
    }
    request(queryUrl, function (error, response, body) {
        if (error) {
            console.log("error!")
            return
        }
        var concertInfo = JSON.parse(body);
        for (var i = 0; i < 5; i++) {
            var artist = concertInfo[i].lineup
            var venue = concertInfo[i].venue.name
            var date = moment(concertInfo[i].datetime).format('MM/DD/YYYY')
            console.log(`Artist: ${artist}`)
            console.log(`Venue: ${venue}`)
            console.log(`Date: ${date}\n`)
        }
    })
}

var songThis = function (input) {
    var song = input

    spotify
        .search({
            type: 'track',
            query: song,
            limit: 1
        })
        .then(function (response) {

            var artist = response.tracks.items[0].artists[0].name
            var title = response.tracks.items[0].name
            var previewUrl = response.tracks.items[0].preview_url
            var album = response.tracks.items[0].album.name

            console.log("Artist: " + artist)
            console.log("Title: " + title)
            console.log(`Preview URL: ${previewUrl}`)
            console.log(`Album: ${album}\n`)

        })
        .catch(function (err) {
            console.log(err);
        });
}

var movieThis = function (input) {
    var movieQuery = ''
    if (!input) {
        title = "Mr. Nobody"
        movieQuery = "http://www.omdbapi.com/?t=" + title + "&y=&plot=short&apikey=trilogy";

    } else {
        title = input
        movieQuery = 'http://www.omdbapi.com/?apikey=trilogy&t=' + title
    }

    request(movieQuery, function (error, response, body) {
        if (error) {
            console.log("error!")
            return
        }
        var movieInfo = JSON.parse(body);

        console.log(`Title: ${movieInfo.Title}`)
        console.log(`Year: ${movieInfo.Year}`)
        console.log(`Imdb Rating: ${movieInfo.imdbRating}`)
        console.log(`Rotten tomatoes Rating: ${movieInfo.Ratings[1].Value}`)
        console.log(`Country: ${movieInfo.Country}`)
        console.log(`Language: ${movieInfo.Language}`)
        console.log(`Plot: ${movieInfo.Plot}`)
        console.log(`Actors: ${movieInfo.Actors}\n`)
    })
}

if (command === "concert-this") {
    artist = process.argv.slice(3).join(" ")
    concertThis(artist)
} else if (command === "spotify-this-song") {
    song = process.argv.slice(3).join(" ")
    songThis(song)

} else if (command === "movie-this") {
    movie = process.argv.slice(3).join("+") 
    movieThis(movie)

} else if (command === "do-this") {

    fs.readFile("random.txt", "utf8", function (error, data) {

        if (error) {
            return console.log(error);
        }

        var dataArr = data.split(",");
        command = dataArr[0]

        if (command === "concert-this") {
            band = dataArr[1]
            concertThis(band)
        } else if (command === "spotify-this-song") {
            song = dataArr[1]
            songThis(song)
        } else if (command === "movie-this") {
            movie = dataArr[1]
            movieThis(movie)
        }
    });

} else {
    console.log("not a command liri knows! try concert-this, spotify-this-song, movie-this, or do-this ")
}

