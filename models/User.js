const { DataTypes } = require('sequelize');
const fp = require('fastify-plugin')

function plugin (fastify, options, done) {
    const User = fastify.sequelize.define('User', {
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    fastify.decorate("User", User);

    done()
}

module.exports = fp(plugin)
