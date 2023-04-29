const { DataTypes, Model } = require('sequelize');
const fp = require('fastify-plugin')

function plugin (fastify, options, done) {
    class AnimeProducers extends Model {

    }
    AnimeProducers.init({

    }, {
        sequelize: fastify.sequelize,
        freezeTableName: true
    });

    fastify.decorate("AnimeProducers", AnimeProducers);

    done();
}

module.exports = fp(plugin);