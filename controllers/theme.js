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

async function getAllThemes(req, reply) {
    const { Theme } = this.sequelize.models;

    const themes = await Theme.findAll({ attributes: ['name']});
    const themesArray = themes.map((the) => { return the.name });
    return { data: themesArray };
}

module.exports = { getAnimeTheme, getAllThemes };