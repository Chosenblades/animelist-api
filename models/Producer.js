const { DataTypes, Model } = require('sequelize');
const fp = require('fastify-plugin')

function plugin (fastify, options, done) {
    class Producer extends Model {
    }
    Producer.init({
        name: DataTypes.STRING
    }, {
        sequelize: fastify.sequelize
    });

    fastify.decorate("Producer", Producer);

    done();
}

module.exports = fp(plugin);