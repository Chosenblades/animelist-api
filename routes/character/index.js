const {
    getOneCharacter,
    getMultipleCharacters,
    getCharactersAnime,
    getCharactersPeople
} = require("../../controllers/character.js");

const getOneCharacterOptions = {
    schema: {
        response: {
            '2xx': { $ref: 'characterSchema' }
        },
        params: {
            type: 'object',
            properties: {
                characterId: { type: 'integer' }
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

    fastify.get('/:characterId', getOneCharacterOptions, getOneCharacter);
    fastify.get('/', getMultipleCharacters);

    fastify.get('/:characterId/anime', getCharactersAnime);
    fastify.get('/:characterId/people', getCharactersPeople);
}