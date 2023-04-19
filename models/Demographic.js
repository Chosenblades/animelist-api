const { DataTypes, Model } = require('sequelize');
const fp = require('fastify-plugin')

function plugin (fastify, options, done) {
    class Demographic extends Model {
    }
    Demographic.init({
        name: DataTypes.STRING
    }, {
        sequelize: fastify.sequelize
    });

    fastify.decorate("Demographic", Demographic);

    done();
}

module.exports = fp(plugin);