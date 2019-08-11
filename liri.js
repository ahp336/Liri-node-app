require("dotenv").config();
var keys = require('./keys.js');
var Spotify = require('node-spotify-api')
var spotify = new Spotify(keys.spotify);
var fs = require("fs");
var axios = require("axios");
var moment = require('moment');


// Naming of all the variables
var commands = process.argv[2];
var term = process.argv.slice(3).join(" ");

// Default Commands if there is no input
if (!commands) {
    commands = "spotifythis"
    term = "I want it that way"

    console.log("\n------------------\n");

    spotify.search({ type: 'track', query: term }, function (err, data) {
        if (err) {
            throw err;
        }
        var jsonData = data.tracks.items;
        var result = [
            "Artist: " + jsonData[0].album.artists[0].name,
            "Song Title: " + jsonData[0].name,
            "Albumn: " + jsonData[0].album.name,
            "Preview Link of Song from Spotify: " + jsonData[0].album.external_urls.spotify
        ].join('\n\n');

        fs.appendFile('log.txt', result, function (err, data) {
            if (err) throw err;
            console.log(result);
            console.log('\n-------------------\n');
        })

    })
}

// Functions for all the commands.

// fuction logic for concert
else if (commands === "concert") {
    console.log("\n---------------\n")
    console.log("Infomation about the events:");

    this.findBand = function (artist) {
        var URL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

        axios.get(URL).then(function (response) {
            var jsonData = response.data

            var result = [
                "Venue: " + jsonData[0].venue.name,
                "Venue Location: " + jsonData[0].venue.city + ", " + jsonData[0].venue.region + " " + jsonData[0].venue.country,
                "Date/Time of the Event: " + moment(jsonData[0].datetime).format("MM/DD/YYYY"),
            ].join('\n\n');


            fs.appendFile('log.txt', result, function (err, data) {
                if (err) throw err;
                console.log(result);
                console.log('\n-------------------\n')
            })
        });

    }
    this.findBand(term);
    console.log('\n-------------------\n');
}

// function for movie
else if (commands === "movie") {
    console.log("\n---------------\n")
    console.log("Infomation about movie:");
    this.findMovie = function (movies) {
        var URL = "http://www.omdbapi.com/?t=" + movies + "&apikey=trilogy"

        axios.get(URL).then(function (response) {

            var jsonData = response.data
            var result = [
                "Title of the movie: " + jsonData.Title,
                "Year the movie: " + jsonData.Released,
                "Rating of the movie: " + jsonData.imdbRating,
                "Rotten Tomatoes Rating: " + jsonData.Ratings[1].Value,
                "Movies Production: " + jsonData.Production,
                "Movie Language: " + jsonData.Language,
                "Plot: " + jsonData.Plot,
                "Actors in the movie: " + jsonData.Actors

            ].join('\n\n');

            fs.appendFile('log.txt', result, function (err, data) {
                if (err) throw err;
                console.log(result);
                console.log('\n-------------------\n');
            })
        })
    }
    this.findMovie(term);
    console.log('\n-------------------\n');
}
// function for spotifythis
else if (commands === "spotifythis") {

    console.log("Infomation about song:");
    console.log('\n-------------------\n');

    spotify.search({ type: 'track', query: term }, function (err, data) {
        if (err) {
            throw err;
        }
        var jsonData = data.tracks.items;
        var result = [
            "Artist: " + jsonData[0].album.artists[0].name,
            "Song Title: " + jsonData[0].name,
            "Albumn: " + jsonData[0].album.name,
            "Preview Link of Song from Spotify: " + jsonData[0].album.external_urls.spotify
        ].join('\n\n');

        fs.appendFile('log.txt', result, function (err, data) {
            if (err) throw err;
            console.log(result);
            console.log('\n-------------------\n');
        })

    })
};
