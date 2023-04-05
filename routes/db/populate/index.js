'use strict'

const AnimeDatabase = require('../../../config/anime-offline-database.json');

module.exports = async function (fastify, opts) {
    fastify.post('/', async function (request, reply) {
        try {
            await this.Anime.insertMany(AnimeDatabase);
            return "All anime has been inserted.";
        } catch (error) {
            fastify.log.error(error);
            return reply.internalServerError();
        }
    })
}
