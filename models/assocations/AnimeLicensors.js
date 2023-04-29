const { DataTypes, Model } = require('sequelize');
const fp = require('fastify-plugin')

function plugin (fastify, options, done) {
    class AnimeLicensors extends Model {

    }
    AnimeLicensors.init({

    }, {
        sequelize: fastify.sequelize,
        freezeTableName: true
    });

    fastify.decorate("AnimeLicensors", AnimeLicensors);

    done();
}

module.exports = fp(plugin);