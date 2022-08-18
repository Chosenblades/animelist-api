'use strict'

module.exports = async function (fastify, opts) {
    fastify.get('/', async function (request, reply) {
        await fastify.sequelize.sync({ force: true });
        console.log("All models were synchronized successfully.");
        return 'All models were synchronized successfully.'
    })
}
