const { DataTypes, Model } = require('sequelize');
const fp = require('fastify-plugin')

function plugin (fastify, options, done) {
    class Licensor extends Model {
    }
    Licensor.init({
        name: DataTypes.STRING
    }, {
        sequelize: fastify.sequelize
    });

    fastify.decorate("Licensor", Licensor);

    done();
}

module.exports = fp(plugin);