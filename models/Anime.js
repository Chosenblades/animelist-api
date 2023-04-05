const fp = require('fastify-plugin')
const mongoose = require('mongoose');

function plugin (fastify, options, done) {

    const animeSchema = new mongoose.Schema({
        sources: {
            type: [String]
        },
        title: {
            type: String
        },
        type: {
            type: String,
            enum: ['TV', 'MOVIE', 'OVA', 'ONA', 'SPECIAL', 'UNKNOWN']
        },
        episodes: Number,
        status: {
            type: String,
            enum: ['FINISHED', 'ONGOING', 'UPCOMING', 'UNKNOWN']
        },
        season: {
            type: String,
            enum: ['SPRING', 'SUMMER', 'FALL', 'WINTER', 'UNDEFINED']
        },
        year: Number,
        picture: String,
        thumbnail: String,
        synonyms: [String],
        relations: [String],
        tags: [String]
    }, {
        collection: 'anime'
    })

    const Anime = mongoose.model('Anime', animeSchema);

    fastify.decorate("Anime", Anime);

    done();
}

module.exports = fp(plugin)
