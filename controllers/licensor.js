async function getAnimeLicensor(req, reply) {
    const { Anime, Licensor } = this.sequelize.models;

    const { animeId } = req.params;
    const licensor = Anime.findByPk(animeId, {
        attributes: [],
        include: {
            model: Licensor, attributes: ['id', 'name'], through: { attributes: [] }
        }
    });

    return licensor;
}

module.exports = { getAnimeLicensor };