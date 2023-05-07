'use strict'

const { getAnimeStudio } = require('../../controllers/studio.js');

/**
 *
 * @param fastify
 * @param fastify.get
 * @param fastify.delete
 * @param fastify.put
 * @param fastify.post
 * @param fastify.Studio
 * @param opts
 * @returns {Promise<void>}
 */
module.exports = async function (fastify, opts) {

    //fastify.get('/:studioId', getOneStudio);
    fastify.get('/anime/:animeId', getAnimeStudio)
}