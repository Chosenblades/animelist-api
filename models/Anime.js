const { DataTypes, Model } = require('sequelize');
const fp = require('fastify-plugin')

function plugin (fastify, options, done) {
    class Anime extends Model {

    }
    Anime.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        synopsis: DataTypes.STRING(5000),
        image_url: DataTypes.STRING,
        title_synonyms: DataTypes.STRING,
        title_romaji: DataTypes.STRING,
        title_japanese: DataTypes.STRING,
        title_english: DataTypes.STRING,
        title_german: DataTypes.STRING,
        title_spanish: DataTypes.STRING,
        title_french: DataTypes.STRING,
        type: {
            type: DataTypes.ENUM,
            values: ["TV", "Movie", "OVA", "Special", "ONA"]
        },
        episodes: DataTypes.INTEGER,
        status: {
            type: DataTypes.ENUM,
            values: ["Finished Airing", "Currently Airing", "Not yet aired"]
        },
        aired: DataTypes.STRING,
        season: {
            type: DataTypes.ENUM,
            values: ["Spring", "Summer", "Fall", "Winter"]
        },
        year: DataTypes.INTEGER,
        broadcast: DataTypes.STRING,
        source: {
            type: DataTypes.ENUM,
            values: ["Original", "Manga", "Light novel", "Game", "Visual novel", "4-koma manga", "Novel", "Other", "Unknown", "Picture book", "Web manga", "Music", "Radio", "Book", "Card game", "Mixed media", "Web novel"]
        },
        rating: {
            type: DataTypes.ENUM,
            values: ["R - 17+ (violence & profanity)", "PG-13 - Teens 13 or older", "PG - Children", "R+ - Mild Nudity", "G - All Ages", "Rx - Hentai", "None"]
        }
    }, {
        sequelize: fastify.sequelize,
        freezeTableName: true,
        indexes: [
            {
                type: 'FULLTEXT',
                fields: ['title_romaji', 'title_english', 'title_synonyms'],
                name: 'search_by_title'
            }
        ]
    });

    fastify.decorate("Anime", Anime);

    done();
}

module.exports = fp(plugin);
