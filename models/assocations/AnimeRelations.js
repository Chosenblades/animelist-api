const { DataTypes, Model } = require('sequelize');
const fp = require('fastify-plugin')

function plugin (fastify, options, done) {
    class AnimeRelations extends Model {

    }
    AnimeRelations.init({
        relation: DataTypes.STRING
    }, {
        sequelize: fastify.sequelize,
        freezeTableName: true
    });

    fastify.decorate("AnimeRelations", AnimeRelations);

    done();
}

module.exports = fp(plugin);