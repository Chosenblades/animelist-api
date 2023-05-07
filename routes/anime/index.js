'use strict'

const S = require('fluent-json-schema');
const { getOneAnime, getMultipleAnime, createAnime, updateAnime, deleteAnime, searchAnime, getAnimeRelations } = require('../../controllers/anime.js');

const getOneAnimeOptions = {
    schema: {
        response: {
            '2xx': { $ref: 'animeSchema' }
        },
        params: {
            type: 'object',
            properties: {
                animeId: { type: 'integer' }
            },
        },
    }
}

const getMultipleAnimeOptions = {
    schema: {
        response: {
            '2xx': {
                type: 'array',
                items: { $ref: 'animeSchema' }
            }
        }
    }
}

const createAnimeOptions = {
    schema: {
        response: {
            200: {
                type: 'string'
            }
        }
    }
}

const updateAnimeOptions = {
    schema: {
        response: {
            200: {
                type: 'string'
            }
        }
    }
}

const deleteAnimeOptions = {
    schema: {
        response: {
            200: {
                type: 'string'
            }
        }
    }
}

const searchAnimeTitleOptions = {
    schema: {
        response: {
            '2xx': { $ref: 'animeSchema' }
        },
        querystring: {
            type: 'object',
            properties: {
                title: { type: 'string' }
            },
        },
    }
}

/**
 *
 * @param fastify
 * @param fastify.get
 * @param fastify.delete
 * @param fastify.put
 * @param fastify.post
 * @param fastify.Anime
 * @param opts
 * @returns {Promise<void>}
 */
module.exports = async function (fastify, opts) {

    fastify.get('/:animeId', getOneAnimeOptions, getOneAnime);
    fastify.get('/', { getMultipleAnimeOptions }, getMultipleAnime);
    fastify.post('/:animeId', { createAnimeOptions }, createAnime);
    fastify.put('/:animeId', { updateAnimeOptions }, updateAnime);
    fastify.delete('/:animeId', { deleteAnimeOptions }, deleteAnime);

    fastify.get('/search', searchAnime);
    fastify.get('/relations/:animeId', getAnimeRelations);
}
