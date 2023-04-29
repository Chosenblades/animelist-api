const { DataTypes, Model } = require('sequelize');
const fp = require('fastify-plugin')

function plugin (fastify, options, done) {
    class CharacterVoiceActors extends Model {

    }
    CharacterVoiceActors.init({
        language: DataTypes.STRING
    }, {
        sequelize: fastify.sequelize,
        freezeTableName: true
    });

    fastify.decorate("CharacterVoiceActors", CharacterVoiceActors);

    done();
}

module.exports = fp(plugin);