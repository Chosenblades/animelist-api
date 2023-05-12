'use strict'

const { getAnimeDemographic, getAllDemographics } = require('../../controllers/demographic.js');
const S = require("fluent-json-schema");

const animeDemographicResponse = S.object()
    .prop('Demographic', S.anyOf([S.ref('demographicSchema'), S.null()]))

const getAnimeDemographicOptions = {
    schema: {
        response: {
            '2xx': animeDemographicResponse
        },
        params: {
            type: 'object',
            properties: {
                animeId: { type: 'integer' }
            },
        },
    }
}

const allDemographicsResponse = S.object()
    .prop('demographics', S.array().items(S.string()));

const getAllDemographicsOptions = {
    schema: {
        response: {
            '2xx': allDemographicsResponse
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
 * @param fastify.Demographic
 * @param opts
 * @returns {Promise<void>}
 */
module.exports = async function (fastify, opts) {

    fastify.get('/anime/:animeId', getAnimeDemographicOptions, getAnimeDemographic);
    fastify.get('/', getAllDemographicsOptions, getAllDemographics);
}