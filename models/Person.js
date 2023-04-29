const { DataTypes, Model } = require('sequelize');
const fp = require('fastify-plugin')

function plugin (fastify, options, done) {
    class Person extends Model {

    }
    Person.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: DataTypes.STRING,
        mal_url: DataTypes.STRING,
        image_url: DataTypes.STRING
    }, {
        sequelize: fastify.sequelize
    });

    fastify.decorate("Person", Person);

    done();
}

module.exports = fp(plugin);