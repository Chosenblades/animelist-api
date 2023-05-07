'use strict'

const { getAnimeGenre } = require('../../controllers/genre.js');

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
    fastify.get('/anime/:animeId', getAnimeGenre)
}