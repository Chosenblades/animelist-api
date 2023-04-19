'use strict'

const { getOneAnime, getMultipleAnime, createAnime, updateAnime, deleteAnime } = require('../../controllers/anime.js');

const AnimeSchema = {
    $id: 'animeSchema',
    type: 'object',
    properties: {
        id: { type: 'integer' },
        synopsis: { type: 'string' },
        image_url: { type: 'string' },
        title_synonyms: { type: 'string' },
        title_romaji: { type: 'string' },
        title_japanese: { type: 'string' },
        title_english: { type: 'string' },
        title_german: { type: 'string' },
        title_spanish: { type: 'string' },
        title_french: { type: 'string' },
        type: {
            type: 'string',
            enum: ["TV", "Movie", "OVA", "Special", "ONA"]
        },
        episodes: { type: 'integer' },
        status: {
            type: 'string',
            enum: ["Finished Airing", "Currently Airing", "Not yet aired"]
        },
        aired: { type: 'string' },
        season: {
            type: 'string',
            enum: ["Spring", "Summer", "Fall", "Winter"]
        },
        year: { type: 'integer' },
        broadcast: { type: 'string' },
        source: {
            type: 'string',
            enum: ["Original", "Manga", "Light novel", "Game", "Visual novel", "4-koma manga", "Novel", "Other", "Unknown", "Picture book", "Web manga", "Music", "Radio", "Book", "Card game", "Mixed media", "Web novel"]
        },
        rating: {
            type: 'string',
            enum: ["R - 17+ (violence & profanity)", "PG-13 - Teens 13 or older", "PG - Children", "R+ - Mild Nudity", "G - All Ages", "Rx - Hentai", "None"]
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
