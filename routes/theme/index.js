'use strict'

const { getAnimeTheme, getAllThemes } = require('../../controllers/theme.js');
const S = require("fluent-json-schema");

const responseSchema = S.object()
    .prop('Themes', S.anyOf([S.array().items(S.ref('themeSchema')), S.null()]))

const getAnimeThemesOptions = {
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

const allThemesResponse = S.object()
    .prop('data', S.array().items(S.string()));

const getAllThemesOptions = {
    schema: {
        response: {
            '2xx': allThemesResponse
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
 * @param fastify.Theme
 * @param opts
 * @returns {Promise<void>}
 */
module.exports = async function (fastify, opts) {

    //fastify.get('/:studioId', getOneTheme);
    fastify.get('/anime/:animeId', getAnimeThemesOptions, getAnimeTheme);
    fastify.get('/', getAllThemesOptions, getAllThemes)
}