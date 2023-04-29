const { DataTypes, Model } = require('sequelize');
const fp = require('fastify-plugin')

function plugin (fastify, options, done) {
    class AnimeCharacters extends Model {

    }
    AnimeCharacters.init({
        type: DataTypes.STRING
    }, {
        sequelize: fastify.sequelize,
        freezeTableName: true
    });

    fastify.decorate("AnimeCharacters", AnimeCharacters);

    done();
}

module.exports = fp(plugin);