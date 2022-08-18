'use strict'

import { getOneAnime } from '/controllers/anime.js';

const Anime = {
    type: 'object',
    properties: {
        sources: {
            type: 'array',
            items: 'string'
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
            items: 'string'
        },
        relations: {
            type: 'array',
            items: 'string'
        },
        tags: {
            type: 'array',
            items: 'string'
        }
    }
}

const getOneAnimeOptions = {
    schema: {
        response: {
            200: Anime
        }
    },
    handler: getOneAnime(req, reply)
}

const getMultipleAnimeOptions = {
    schema: {
        response: {
            200: {
                type: 'array',
                items: Anime
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
    fastify.get('/', async function (request, reply) {
        return fastify.Anime.count();
    })

    fastify.delete('/', async function (request, reply) {

        fastify.Anime.destroy({
            truncate: true
        });

        return "Success"
    })
}
