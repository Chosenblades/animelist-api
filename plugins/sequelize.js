'use strict'

const fp = require('fastify-plugin');
const { Sequelize } = require('sequelize');

async function plugin (fastify, options, done) {
    const PG_URI = process.env.PG_URI || null;

    const sequelize = new Sequelize(PG_URI, {
        ssl: true,
        dialectOptions: {
            ssl: {
                require: true
            },
            native: true
        },
        // pool configuration used to pool database connections
        pool: {
            max: 50
        },
    });

    /** Test db connection **/
    await sequelize.authenticate();

    /** Connection successful, create fastify decorator **/
    fastify.decorate('sequelize', sequelize);
    fastify.addHook('onClose', (fastifyInstance, done) => {
        sequelize.close()
            .then(done)
            .catch(done)
    });

    done();
}

module.exports = fp(plugin);