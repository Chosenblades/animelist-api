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

module.exports = { getAnimeGenre };