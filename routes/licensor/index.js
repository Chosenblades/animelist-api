'use strict'

const { getAnimeLicensor } = require('../../controllers/licensor.js');

/**
 *
 * @param fastify
 * @param fastify.get
 * @param fastify.delete
 * @param fastify.put
 * @param fastify.post
 * @param fastify.Licensor
 * @param opts
 * @returns {Promise<void>}
 */
module.exports = async function (fastify, opts) {

    //fastify.get('/:studioId', getOneLicensor);
    fastify.get('/anime/:animeId', getAnimeLicensor)
}