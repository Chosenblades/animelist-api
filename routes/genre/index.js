'use strict'

const { getAnimeGenre, getAllGenres } = require('../../controllers/genre.js');
const S = require("fluent-json-schema");

const responseSchema = S.object()
    .prop('Genres', S.anyOf([S.array().items(S.ref('genreSchema')), S.null()]))

const getAnimeGenresOptions = {
    schema: {
        response: {
            '2xx': responseSchema
        },
        params: {
            type: 'object',
            properties: {
                animeId: { type: 'integer' }
            },
        },
    }
}

const allGenresResponse = S.object()
    .prop('data', S.array().items(S.string()));

const getAllGenresOptions = {
    schema: {
        response: {
            '2xx': allGenresResponse
        }
    }
}

/**
 *
 * @param fastify
 * @param fastify.get
 * @param fastify.delete
 * @param fastify.put
 * @param fastify.post
 * @param fastify.Genre
 * @param opts
 * @returns {Promise<void>}
 */
module.exports = async function (fastify, opts) {

    //fastify.get('/:studioId', getOneGenre);
    fastify.get('/anime/:animeId', getAnimeGenresOptions, getAnimeGenre);
    fastify.get('/', getAllGenresOptions, getAllGenres)
}