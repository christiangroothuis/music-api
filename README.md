# Music API
A REST API written in TypeScript that delivers artist and album data for the [music-client](https://github.com/JuanGrooth/music-client).

### Endpoints
- `/home` - Returns 10 random albums and 10 random artists to display as featured on the home page of music-client
- `/search/{query}` - Returns the search results of the given query
- `/albums` - Returns all albums
- `/albums/{albumId}` - Returns info about the album and its tracks
- `/artists` - Returns all artists
- `/artists/{artistId}` - Returns info about the artist, their albums and the albums they featured on

Currently, a live version of the API is hosted on my Raspberry Pi, which can be found [here](https://music.christiangroothuis.nl/api/home).

I gathered the data using a script that 
1. Goes through all the album files and finds all the artists in their song's metadata and creates a folder for each of them
2. Downloads an avatar image for each artist using the Spotify API and posts the artists to the database
3. Donwloads the artwork image for each album and gets all the songs's metadata and posts it to the database

The data I'm currently using in Mongo can be found in the json files in de the data directory of this repo.

## Built With

* [MongoDB](https://www.mongodb.com/) - NoSQL database used to store and retrieve the data
* [Express](https://expressjs.com/) - The framework used to create the endpoints
* [Node.js](https://nodejs.org/) - JavaScript runtime environment
