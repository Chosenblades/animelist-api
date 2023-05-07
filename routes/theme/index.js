'use strict'

const { getAnimeTheme } = require('../../controllers/theme.js');

/**
 *
 * @param fastify
 * @param fastify.get
 * @param fastify.delete
 * @param fastify.put
 * @param fastify.post
 * @param fastify.Theme
 * @param opts
 * @returns {Promise<void>}
 */
module.exports = async function (fastify, opts) {

    //fastify.get('/:studioId', getOneTheme);
    fastify.get('/anime/:animeId', getAnimeTheme)
}