async function getAnimeProducer(req, reply) {
    const { Anime, Producer } = this.sequelize.models;

    const { animeId } = req.params;
    const producer = Anime.findByPk(animeId, {
        attributes: [],
        include: {
            model: Producer, attributes: ['id', 'name'], through: { attributes: [] }
        }
    });

    return producer;
}

module.exports = { getAnimeProducer };