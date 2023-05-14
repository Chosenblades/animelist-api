'use strict'

const { getAnimeStudio, getAllStudios } = require('../../controllers/studio.js');
const S = require("fluent-json-schema");

const responseSchema = S.object()
    .prop('Studios', S.anyOf([S.array().items(S.ref('studioSchema')), S.null()]))

const getAnimeStudiosOptions = {
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

const allStudiosResponse = S.object()
    .prop('data', S.array().items(S.string()));

const getAllStudiosOptions = {
    schema: {
        response: {
            '2xx': allStudiosResponse
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
 * @param fastify.Studio
 * @param opts
 * @returns {Promise<void>}
 */
module.exports = async function (fastify, opts) {

    //fastify.get('/:studioId', getOneStudio);
    fastify.get('/anime/:animeId', getAnimeStudiosOptions, getAnimeStudio);
    fastify.get('/', getAllStudiosOptions, getAllStudios)
}