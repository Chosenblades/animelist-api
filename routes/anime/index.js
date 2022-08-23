'use strict'

const { getOneAnime, getMultipleAnime, createAnime, updateAnime, deleteAnime } = require('../../controllers/anime.js');

const AnimeSchema = {
    $id: 'animeSchema',
    type: 'object',
    properties: {
        sources: {
            type: 'array',
            items: { type: 'string' }
        },
        title: { type: 'string' },
        type: {
            type: 'string',
            enum: ['TV', 'MOVIE', 'OVA', 'ONA', 'SPECIAL', 'UNKNOWN']
        },
        episodes: { type: 'integer' },
        status: {
            type: 'string',
            enum: ['FINISHED', 'ONGOING', 'UPCOMING', 'UNKNOWN']
        },
        season: {
            type: 'string',
            enum: ['SPRING', 'SUMMER', 'FALL', 'WINTER', 'UNDEFINED']
        },
        year: { type: 'integer' },
        picture: { type: 'string' },
        thumbnail: { type: 'string' },
        synonyms: {
            type: 'array',
            items: { type: 'string' }
        },
        relations: {
            type: 'array',
            items: { type: 'string' }
        },
        tags: {
            type: 'array',
            items: { type: 'string' }
        }
    }
}

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

    fastify.addSchema(AnimeSchema);

    fastify.get('/:animeId', getOneAnimeOptions, getOneAnime);
    fastify.get('/', { getMultipleAnimeOptions }, getMultipleAnime);
    fastify.post('/:animeId', { createAnimeOptions }, createAnime);
    fastify.put('/:animeId', { updateAnimeOptions }, updateAnime);
    fastify.delete('/:animeId', { deleteAnimeOptions }, deleteAnime);
}
