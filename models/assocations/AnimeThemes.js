const { DataTypes, Model } = require('sequelize');
const fp = require('fastify-plugin')

function plugin (fastify, options, done) {
    class AnimeThemes extends Model {

    }
    AnimeThemes.init({

    }, {
        sequelize: fastify.sequelize,
        freezeTableName: true
    });

    fastify.decorate("AnimeThemes", AnimeThemes);

    done();
}

module.exports = fp(plugin);