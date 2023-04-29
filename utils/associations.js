const fp = require('fastify-plugin');

function plugin(fastify, options, done) {
    const { Anime, AnimeRelations, Demographic, Genre, AnimeGenres, Licensor, AnimeLicensors, Producer, AnimeProducers, Studio, AnimeStudios, Theme, AnimeThemes, Character, Person, AnimeCharacters, AnimeStaff, CharacterVoiceActors } = fastify.sequelize.models;

    //Many Anime to many Anime
    Anime.belongsToMany(Anime, { as: 'ParentAnime', through: AnimeRelations, foreignKey: 'parentAnimeId', constraints: false })
    Anime.belongsToMany(Anime, { as: 'ChildAnime', through: AnimeRelations, foreignKey: 'childAnimeId', constraints: false })

    //Many Anime to one Demographic
    Demographic.hasMany(Anime, { foreignKey: 'demographicId', constraints: false });
    Anime.belongsTo(Demographic, { foreignKey: 'demographicId', constraints: false });

    //Many Genre to many Anime
    Anime.belongsToMany(Genre, { through: AnimeGenres, foreignKey: 'animeId', constraints: false });
    Genre.belongsToMany(Anime, { through: AnimeGenres, foreignKey: 'genreId', constraints: false });

    //Many Licensor to many Anime
    Anime.belongsToMany(Licensor, { through: AnimeLicensors, foreignKey: 'animeId', constraints: false });
    Licensor.belongsToMany(Anime, { through: AnimeLicensors, foreignKey: 'licensorId', constraints: false })

    //Many Producer to many Anime
    Anime.belongsToMany(Producer, { through: AnimeProducers, foreignKey: 'animeId', constraints: false });
    Producer.belongsToMany(Anime, { through: AnimeProducers, foreignKey: 'producerId', constraints: false });

    //Many Studio to many Anime
    Anime.belongsToMany(Studio, { through: AnimeStudios, foreignKey: 'animeId', constraints: false });
    Studio.belongsToMany(Anime, { through: AnimeStudios, foreignKey: 'studioId', constraints: false });

    //Many Theme to many Anime
    Anime.belongsToMany(Theme, { through: AnimeThemes, foreignKey: 'animeId', constraints: false });
    Theme.belongsToMany(Anime, { through: AnimeThemes, foreignKey: 'themeId', constraints: false });

    //Many Character to many Anime
    Anime.belongsToMany(Character, { through: AnimeCharacters, foreignKey: 'animeId', constraints: false });
    Character.belongsToMany(Anime, { through: AnimeCharacters, foreignKey: 'characterId', constraints: false });

    //Many Staff to many Anime
    Anime.belongsToMany(Person, { through: AnimeStaff, foreignKey: 'animeId', constraints: false });
    Person.belongsToMany(Anime, { through: AnimeStaff, foreignKey: 'personId', constraints: false });

    //Many Character to many VoiceActor
    Character.belongsToMany(Person, { through: CharacterVoiceActors, foreignKey: 'characterId', constraints: false });
    Person.belongsToMany(Character, { through: CharacterVoiceActors, foreignKey: 'personId', constraints: false });

    done();
}

module.exports = fp(plugin);