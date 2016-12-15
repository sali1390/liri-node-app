console.log("It Works!")

var command = process.argv[2];

if (command === "my-tweets"){
    displayTweets()
} else if (command === "spotify-this-song"){
    spotifySong()
} else if (command === "movie-this"){
    movieThis();
} else if (command === "do-what-it-says"){
    doWhatever();
}

function displayTweets(){
    var twitterKeys = require('./keys.js');
    var Twitter = require('twitter');
 
    var client = new Twitter(
        twitterKeys.twitterKeys
    );
    
    var params = {screen_name: 'misssaleema'};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            for (var i = 0; i < tweets.length; i++){
                console.log([i]+'. '+tweets[i].created_at+': '+tweets[i].text);
            }
        }
    });
};

function spotifySong(){
    var spotify = require('spotify');
    
    var songInput = process.argv;
    var songArr = [];
    
    for (var i=3; i < songInput.length; i++){
        songArr.push(songInput[i]);
    }
    
    //converts the movie array to a string that we can use
    if (songArr.length === 0) {
        var song = "The Sign";
        
        console.log(song);
        
        spotify.search({ type: 'track', query: song }, function(err, data) {
            if ( err ) {
                console.log('Error occurred: ' + err);
                return;
            } else{
                var songData = JSON.stringify(data, null, 2);
                
                console.log(songData);

                var songName = data.tracks.items[6].name;
                var songArtist = data.tracks.items[6].album.artists[0].name;
                var albumName =  data.tracks.items[6].album.name;
                var previewLink = data.tracks.items[6].artists[0].external_urls.spotify;

                console.log('Name: ' + songName);
                console.log('Artist: ' + songArtist);
                console.log('Album: ' + albumName);
                console.log('Preview: ' + previewLink);
            }
        });   
    } else {
        var song = songArr.join().split(',').join(' ');
        
        spotify.search({ type: 'track', query: song }, function(err, data) {
            if ( err ) {
                console.log('Error occurred: ' + err);
                return;
            } else{
                var songData = JSON.stringify(data, null, 2);

                var songName = data.tracks.items[0].name;
                var songArtist = data.tracks.items[0].album.artists[0].name;
                var albumName =  data.tracks.items[0].album.name;
                var previewLink = data.tracks.items[0].artists[0].external_urls.spotify;

                console.log('Name: ' + songName);
                console.log('Artist: ' + songArtist);
                console.log('Album: ' + albumName);
                console.log('Preview: ' + previewLink);
            }
        });   
    }
};

function movieThis(){
    var request = require('request');
    
    var movieInput = process.argv;
    var movieArr = [];
    
    for (var i=3; i < movieInput.length; i++){
        movieArr.push(movieInput[i]);
    }
    
    if (movieArr.length === 0) {
        var movie = "Mr.Nobody";
        
        var queryUrl = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&r=json&tomatoes=true";
    
        request(queryUrl, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log('Title: ' + JSON.parse(body).Title);
                console.log('Year Released: ' + JSON.parse(body).Year);
                console.log('IMDB Rating: ' + JSON.parse(body).imdbRating);
                console.log('Country: ' + JSON.parse(body).Country);
                console.log('Language: ' + JSON.parse(body).Language);
                console.log('Plot: ' + JSON.parse(body).Plot);
                console.log('Actors: ' + JSON.parse(body).Actors);
                console.log('Rotten Tomatoes Rating: ' + JSON.parse(body).tomatoRating);
                console.log('Rotten Tomatoes URL: ' + JSON.parse(body).tomatoURL);
            }
        });
    } else {
    
        //converts the movie array to a string that we can use
        var movie = movieArr.join().split(',').join('+');

        var queryUrl = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&r=json&tomatoes=true";

        request(queryUrl, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log('Title: ' + JSON.parse(body).Title);
                console.log('Year Released: ' + JSON.parse(body).Year);
                console.log('IMDB Rating: ' + JSON.parse(body).imdbRating);
                console.log('Country: ' + JSON.parse(body).Country);
                console.log('Language: ' + JSON.parse(body).Language);
                console.log('Plot: ' + JSON.parse(body).Plot);
                console.log('Actors: ' + JSON.parse(body).Actors);
                console.log('Rotten Tomatoes Rating: ' + JSON.parse(body).tomatoRating);
                console.log('Rotten Tomatoes URL: ' + JSON.parse(body).tomatoURL);
            }
        })
    }
};

function doWhatever(){
    var fs = require('fs')
    fs.readFile('random.txt', 'utf8', function (err,data) {
        if (err) {
            return console.log(err);
        } else { 
            var commandArr = data.split(', ');
            
            var song = commandArr[1];
            
            var spotify = require('spotify');
            
            spotify.search({ type: 'track', query: song }, function(err, data) {
                if ( err ) {
                    console.log('Error occurred: ' + err);
                    return;
                } else{
                    var songData = JSON.stringify(data, null, 2);

                    console.log(songData);

                    var songName = data.tracks.items[0].name;
                    var songArtist = data.tracks.items[0].album.artists[0].name;
                    var albumName =  data.tracks.items[0].album.name;
                    var previewLink = data.tracks.items[0].artists[0].external_urls.spotify;

                    console.log('Name: ' + songName);
                    console.log('Artist: ' + songArtist);
                    console.log('Album: ' + albumName);
                    console.log('Preview: ' + previewLink);
                }
            });
        };
    });  
};