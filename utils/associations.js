const fp = require('fastify-plugin');

function plugin(fastify, options, done) {
    const { Anime, AnimeRelations, Demographic, Genre, Licensor, Producer, Studio, Theme, User } = fastify.sequelize.models;

    //Many Anime to many Anime
    Anime.belongsToMany(Anime, { as: 'ParentAnime', through: AnimeRelations, foreignKey: 'parentAnimeId'})
    Anime.belongsToMany(Anime, { as: 'ChildAnime', through: AnimeRelations, foreignKey: 'childAnimeId'})

    //Many Anime to one Demographic
    Demographic.hasMany(Anime, { foreignKey: 'demographicId' });
    Anime.belongsTo(Demographic, { foreignKey: 'demographicId' });

    //Many Genre to many Anime
    Anime.belongsToMany(Genre, { through: 'AnimeGenres' });
    Genre.belongsToMany(Anime, { through: 'AnimeGenres' });

    //Many Licensor to many Anime
    Anime.belongsToMany(Licensor, { through: 'AnimeLicensors' });
    Licensor.belongsToMany(Anime, { through: 'AnimeLicensors' })

    //Many Producer to many Anime
    Anime.belongsToMany(Producer, { through: 'AnimeProducers' });
    Producer.belongsToMany(Anime, { through: 'AnimeProducers' });

    //Many Studio to many Anime
    Anime.belongsToMany(Studio, { through: 'AnimeStudios' });
    Studio.belongsToMany(Anime, { through: 'AnimeStudios' });

    //Many Theme to many Anime
    Anime.belongsToMany(Theme, { through: 'AnimeThemes' });
    Theme.belongsToMany(Anime, { through: 'AnimeThemes' });

    done();
}

module.exports = fp(plugin);