require("dotenv").config();
var keys = require('./keys.js');
var Spotify = require('node-spotify-api')
var spotify = new Spotify(keys.spotify);
var fs = require("fs");
var axios = require("axios");
var moment = require('moment');

// Naming of all the variables
var commands = process.argv[2];
var search = process.argv.slice(3).join(" ");
var spacer = "\n-----------------\n"

// Default Commands if there is no input
// if(!commands){
//     commands = "spotify"
// }
// if(!search){
//     search = "I Want it That Way"
// }


if(commands === "concert"){
    console.log("\n---------------\n")
    console.log("Infomation about the events:");
    console.log()
    this.findBand = function(artist){
        var URL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
        
        axios.get(URL).then(function(response){
            var jsonData = response.data
            var eventDate = jsonData[0].datetime;
            
            var result= [
                "Venue: " + jsonData[0].venue.name,
                "Venue Location: " + jsonData[0].venue.city + ", " + jsonData[0].venue.region + " " + jsonData[0].venue.country ,
                "Date/Time of the Event: " + moment(jsonData[0].datetime).format("MM/DD/YYYY"),
            ].join('\n\n');


            fs.appendFile('log.txt', result, function(err,data){
                if(err) throw err;
                console.log(result);
            })
        });

    }   
    this.findBand(search);
};