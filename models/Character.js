const { DataTypes, Model } = require('sequelize');
const fp = require('fastify-plugin')

function plugin (fastify, options, done) {
    class Character extends Model {

    }
    Character.init({
        name: DataTypes.STRING,
        mal_url: DataTypes.STRING,
        image_url: DataTypes.STRING
    }, {
        sequelize: fastify.sequelize
    });

    fastify.decorate("Character", Character);

    done();
}

module.exports = fp(plugin);