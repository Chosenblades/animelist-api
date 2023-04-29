const { DataTypes, Model } = require('sequelize');
const fp = require('fastify-plugin')

function plugin (fastify, options, done) {
    class AnimeGenres extends Model {

    }
    AnimeGenres.init({

    }, {
        sequelize: fastify.sequelize,
        freezeTableName: true
    });

    fastify.decorate("AnimeGenres", AnimeGenres);

    done();
}

module.exports = fp(plugin);