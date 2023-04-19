const { DataTypes, Model } = require('sequelize');
const fp = require('fastify-plugin')

function plugin (fastify, options, done) {
    class Genre extends Model {
    }
    Genre.init({
        name: DataTypes.STRING
    }, {
        sequelize: fastify.sequelize
    });

    fastify.decorate("Genre", Genre);

    done();
}

module.exports = fp(plugin);