const AnimeDatabase = require('./config/anime-offline-database.json');

function test() {
    const data = AnimeDatabase.data;

    console.log(data[0]);
}

module.exports = test;
