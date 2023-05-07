async function getAnimeStudio(req, reply) {
    const { Anime, Studio } = this.sequelize.models;

    const { animeId } = req.params;
    const studio = Anime.findByPk(animeId, {
        attributes: [],
        include: {
            model: Studio, attributes: ['id', 'name'], through: { attributes: [] }
        }
    });

    return studio;
}

module.exports = { getAnimeStudio };