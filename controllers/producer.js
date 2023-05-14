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

async function getAllProducers(req, reply) {
    const { Producer } = this.sequelize.models;

    const producers = await Producer.findAll({ attributes: ['name']});
    const producersArray = producers.map((prod) => { return prod.name });
    return { data: producersArray };
}

module.exports = { getAnimeProducer, getAllProducers };