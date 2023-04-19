const { DataTypes, Model } = require('sequelize');
const fp = require('fastify-plugin')

function plugin (fastify, options, done) {
    class Studio extends Model {
    }
    Studio.init({
        name: DataTypes.STRING
    }, {
        sequelize: fastify.sequelize
    });

    fastify.decorate("Studio", Studio);

    done();
}

module.exports = fp(plugin);