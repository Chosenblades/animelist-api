async function getAnimeTheme(req, reply) {
    const { Anime, Theme } = this.sequelize.models;

    const { animeId } = req.params;
    const theme = Anime.findByPk(animeId, {
        attributes: [],
        include: {
            model: Theme, attributes: ['id', 'name'], through: { attributes: [] }
        }
    });

    return theme;
}

module.exports = { getAnimeTheme };