'use strict'

const { getAnimeProducer, getAllProducers } = require('../../controllers/producer.js');
const S = require("fluent-json-schema");

const responseSchema = S.object()
    .prop('Producers', S.anyOf([S.array().items(S.ref('producerSchema')), S.null()]))

const getAnimeProducersOptions = {
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

const allProducersResponse = S.object()
    .prop('producers', S.array().items(S.string()));

const getAllProducersOptions = {
    schema: {
        response: {
            '2xx': allProducersResponse
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
 * @param fastify.Producer
 * @param opts
 * @returns {Promise<void>}
 */
module.exports = async function (fastify, opts) {

    //fastify.get('/:studioId', getOneProducer);
    fastify.get('/anime/:animeId', getAnimeProducersOptions, getAnimeProducer);
    fastify.get('/', getAllProducersOptions, getAllProducers)
}