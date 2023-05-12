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

async function getAllStudios(req, reply) {
    const { Studio } = this.sequelize.models;

    const studios = await Studio.findAll({ attributes: ['name']});
    const studiosArray = studios.map((stud) => { return stud.name });
    return { studios: studiosArray };
}

module.exports = { getAnimeStudio, getAllStudios };