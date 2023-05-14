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

async function getAllDemographics(req, reply) {
    const { Demographic } = this.sequelize.models;

    const demographics = await Demographic.findAll({ attributes: ['name']});
    const demoArray = demographics.map((demo) => { return demo.name });
    return { data: demoArray };
}

module.exports = { getAnimeDemographic, getAllDemographics };