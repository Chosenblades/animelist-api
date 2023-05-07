'use strict'

const fp = require('fastify-plugin');
const { Sequelize } = require('sequelize');

async function plugin (fastify, options, done) {
    const PS_URI = process.env.PS_URI || null;

    const sequelize = new Sequelize(PS_URI, {
        ssl: true,
        dialectOptions: {
            ssl: {
                rejectUnauthorized: true
            }
        },
        // pool configuration used to pool database connections
        pool: {
            max: 5,
            min: 0
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