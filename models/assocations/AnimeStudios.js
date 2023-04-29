const { DataTypes, Model } = require('sequelize');
const fp = require('fastify-plugin')

function plugin (fastify, options, done) {
    class AnimeStudios extends Model {

    }
    AnimeStudios.init({

    }, {
        sequelize: fastify.sequelize,
        freezeTableName: true
    });

    fastify.decorate("AnimeStudios", AnimeStudios);

    done();
}

module.exports = fp(plugin);