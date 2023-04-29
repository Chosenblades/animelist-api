'use strict'

module.exports = async function (fastify, opts) {
    fastify.post('/', async function (request, reply) {
        await fastify.sequelize.sync({ force: true });

        return 'All models were synchronized successfully.'
    });

    fastify.post('/animestaff', async function (request, reply) {
        await fastify.sequelize.models.AnimeStaff.sync({ force: true });
        console.log("All models were synchronized successfully.");
        return 'All models were synchronized successfully.'
    });


}
