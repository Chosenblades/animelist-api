async function getAnimeDemographic(req, reply) {
    const { Anime, Demographic } = this.sequelize.models;

    const { animeId } = req.params;
    const demo = Anime.findByPk(animeId, {
        attributes: [],
        include: {
            model: Demographic, attributes: ['id', 'name']
        }
    });

    return demo;
}

module.exports = { getAnimeDemographic };