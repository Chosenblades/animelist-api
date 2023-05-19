const {
    getOnePerson,
    getMultiplePeople,
    getPersonCharacters,
} = require("../../controllers/people.js");

const getOnePersonOptions = {
    schema: {
        response: {
            '2xx': { $ref: 'personSchema' }
        },
        params: {
            type: 'object',
            properties: {
                personId: { type: 'integer' }
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

    fastify.get('/:personId', getOnePersonOptions, getOnePerson);
    fastify.get('/', getMultiplePeople);

    fastify.get('/:personId/characters', getPersonCharacters);
}