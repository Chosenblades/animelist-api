'use strict'

const S = require('fluent-json-schema');
const { getOneAnime, getMultipleAnime, createAnime, updateAnime, deleteAnime, searchAnime, getAnimeRelations, getAnimeCharacters, getAnimeStaff, getAnimeYears } = require('../../controllers/anime.js');

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

const searchResponse = S.object()
    .prop('id', S.integer())
    .prop('title_romaji', S.anyOf([S.string(), S.null()]))
    .prop('image_url', S.anyOf([S.string(), S.null()]))
    .prop('type', S.anyOf([S.enum(["TV", "Movie", "OVA", "Special", "ONA"]), S.null()]));

const searchQuery = S.object()
    .prop('title', S.string())
    .prop('genres', S.array().items(S.enum([
        "Action",
        "Award Winning",
        "Sci-Fi",
        "Adventure",
        "Drama",
        "Mystery",
        "Supernatural",
        "Fantasy",
        "Sports",
        "Comedy",
        "Romance",
        "Slice of Life",
        "Suspense",
        "Ecchi",
        "Gourmet",
        "Avant Garde",
        "Horror",
        "Girls Love",
        "Boys Love",
        "Hentai",
        "Erotica"
    ])))
    .prop('years', S.array().items(S.number().minimum(1961).maximum(2025)))
    .prop('seasons', S.array().items(S.enum(['Spring', 'Summer', 'Fall', 'Winter'])))
    .prop('types', S.array().items(S.enum(["TV", "Movie", "OVA", "Special", "ONA"])))
    .prop('statuses', S.array().items(S.enum(["Finished Airing", "Currently Airing", "Not yet aired"])))
    .prop('demographic', S.array().items(S.enum([
        "Shounen",
        "Josei",
        "Seinen",
        "Shoujo",
        "Kids"
    ])))
    .prop('licensors', S.array().items(S.string()))
    .prop('producers', S.array().items(S.string()))
    .prop('staff', S.array().items(S.string()))
    .prop('characters', S.array().items(S.string()))
    .prop('studios', S.array().items(S.string()))
    .prop('themes', S.array().items(S.string()))

const getMultipleAnimeOptions = {
    schema: {
        response: {
            '2xx': {
                type: 'array',
                items: { searchResponse }
            }
        },
        querystring: searchQuery
    }
}

const searchAnimeTitleOptions = {
    schema: {
        response: {
            '2xx': {
                type: 'array',
                items: { searchResponse }
            }
        },
        querystring: {
            type: 'object',
            properties: {
                title: { type: 'string' }
            },
        },
    }
}

const relationsResponse = S.object()
    .prop('ChildAnime', S.anyOf([S.array().items(S.ref('childAnimeSchema')), S.null()]))

const getAnimeRelationsOptions = {
    schema: {
        response: {
            '2xx': relationsResponse
        },
        params: {
            type: 'object',
            properties: {
                animeId: { type: 'integer' }
            },
        },
    }
}

const charactersResponse = S.object()
    .prop('Characters', S.anyOf([S.array().items(S.ref('characterSchema')), S.null()]))

const getAnimeCharactersOptions = {
    schema: {
        response: {
            '2xx': charactersResponse
        },
        params: {
            type: 'object',
            properties: {
                animeId: { type: 'integer' }
            },
        },
    }
}

const staffResponse = S.object()
    .prop('People', S.anyOf([S.array().items(S.ref('personSchema')), S.null()]))

const getAnimeStaffOptions = {
    schema: {
        response: {
            '2xx': staffResponse
        },
        params: {
            type: 'object',
            properties: {
                animeId: { type: 'integer' }
            },
        },
    }
}

const yearsResponse = S.object()
    .prop('min_years', S.integer())
    .prop('max_years', S.integer());

const getAnimeYearsOptions = {
    schema: {
        response: {
            '2xx': yearsResponse
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

    fastify.get('/:animeId', getOneAnimeOptions, getOneAnime);
    fastify.get('/', getMultipleAnimeOptions, getMultipleAnime);
    fastify.post('/:animeId', { createAnimeOptions }, createAnime);
    fastify.put('/:animeId', { updateAnimeOptions }, updateAnime);
    fastify.delete('/:animeId', { deleteAnimeOptions }, deleteAnime);

    fastify.get('/search', searchAnimeTitleOptions, searchAnime);
    fastify.get('/relations/:animeId', getAnimeRelationsOptions, getAnimeRelations);
    fastify.get('/:animeId/characters', getAnimeCharactersOptions, getAnimeCharacters);
    fastify.get('/:animeId/staff', getAnimeStaffOptions, getAnimeStaff);
    fastify.get('/years', getAnimeYearsOptions, getAnimeYears);
}
