const { DataTypes, Model } = require('sequelize');
const fp = require('fastify-plugin')

function plugin (fastify, options, done) {
    class AnimeStaff extends Model {

    }
    AnimeStaff.init({
        roles: DataTypes.STRING
    }, {
        sequelize: fastify.sequelize,
        freezeTableName: true
    });

    fastify.decorate("AnimeStaff", AnimeStaff);

    done();
}

module.exports = fp(plugin);