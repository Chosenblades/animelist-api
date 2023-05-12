'use strict'

const { getAnimeLicensor, getAllLicensors } = require('../../controllers/licensor.js');
const S = require("fluent-json-schema");

const responseSchema = S.object()
    .prop('Licensors', S.anyOf([S.array().items(S.ref('licensorSchema')), S.null()]))

const getAnimeLicensorsOptions = {
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

const allLicensorsResponse = S.object()
    .prop('licensors', S.array().items(S.string()));

const getAllLicensorsOptions = {
    schema: {
        response: {
            '2xx': allLicensorsResponse
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
 * @param fastify.Licensor
 * @param opts
 * @returns {Promise<void>}
 */
module.exports = async function (fastify, opts) {

    //fastify.get('/:studioId', getOneLicensor);
    fastify.get('/anime/:animeId', getAnimeLicensorsOptions, getAnimeLicensor)
    fastify.get('/', getAllLicensorsOptions, getAllLicensors)
}