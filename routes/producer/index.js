'use strict'

const { getAnimeProducer } = require('../../controllers/producer.js');

/**
 *
 * @param fastify
 * @param fastify.get
 * @param fastify.delete
 * @param fastify.put
 * @param fastify.post
 * @param fastify.Producer
 * @param opts
 * @returns {Promise<void>}
 */
module.exports = async function (fastify, opts) {

    //fastify.get('/:studioId', getOneProducer);
    fastify.get('/anime/:animeId', getAnimeProducer)
}