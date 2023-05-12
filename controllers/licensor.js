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

async function getAllLicensors(req, reply) {
    const { Licensor } = this.sequelize.models;

    const licensors = await Licensor.findAll({ attributes: ['name']});
    const licensorArray = licensors.map((lic) => { return lic.name });
    return { licensors: licensorArray };
}

module.exports = { getAnimeLicensor, getAllLicensors };