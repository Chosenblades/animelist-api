'use strict'

const { getAnimeDemographic } = require('../../controllers/demographic.js');

/**
 *
 * @param fastify
 * @param fastify.get
 * @param fastify.delete
 * @param fastify.put
 * @param fastify.post
 * @param fastify.Demographic
 * @param opts
 * @returns {Promise<void>}
 */
module.exports = async function (fastify, opts) {

    //fastify.get('/:studioId', getOneDemographic);
    fastify.get('/anime/:animeId', getAnimeDemographic)
}