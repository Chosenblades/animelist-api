const { DataTypes, Model } = require('sequelize');
const fp = require('fastify-plugin')

function plugin (fastify, options, done) {
    class AnimeRelation extends Model {

    }
    AnimeRelation.init({
        relation: DataTypes.STRING
    }, {
        sequelize: fastify.sequelize,
        freezeTableName: true
    });

    done();
}

module.exports = fp(plugin);