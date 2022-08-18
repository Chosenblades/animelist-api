const { DataTypes } = require('sequelize');
const fp = require('fastify-plugin')

function plugin (fastify, options, done) {
    const Anime = fastify.sequelize.define('Anime', {
        sources: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: false
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        type: {
            type: DataTypes.ENUM,
            values: ['TV', 'MOVIE', 'OVA', 'ONA', 'SPECIAL', 'UNKNOWN'],
            allowNull: false
        },
        episodes: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        status: {
            type: DataTypes.ENUM,
            values: ['FINISHED', 'ONGOING', 'UPCOMING', 'UNKNOWN'],
            allowNull: false
        },
        season: {
            type: DataTypes.ENUM,
            values: ['SPRING', 'SUMMER', 'FALL', 'WINTER', 'UNDEFINED'],
            allowNull: false
        },
        year: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        picture: {
            type: DataTypes.STRING,
            allowNull: true
        },
        thumbnail: {
            type: DataTypes.STRING,
            allowNull: true
        },
        synonyms: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: true
        },
        relations: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: true
        },
        tags: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: false
        },
    }, {
        freezeTableName: true
    });

    fastify.decorate("Anime", Anime);

    done()
}

module.exports = fp(plugin)
