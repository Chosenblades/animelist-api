async function getAnimeGenre(req, reply) {
    const { Anime, Genre } = this.sequelize.models;

    const { animeId } = req.params;
    const genre = Anime.findByPk(animeId, {
        attributes: [],
        include: {
            model: Genre, attributes: ['id', 'name'], through: { attributes: [] }
        }
    });

    return genre;
}

async function getAllGenres(req, reply) {
    const { Genre } = this.sequelize.models;

    const genres = await Genre.findAll({ attributes: ['name']});
    const genreArray = genres.map((demo) => { return demo.name });
    return { data: genreArray };
}

module.exports = { getAnimeGenre, getAllGenres };