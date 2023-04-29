const { Op } = require('sequelize');

async function getOneStudio(req, reply) {
    const { Genre, Licensor, Producer, Studio, Theme, Demographic, Anime } = this.sequelize.models;
    const { studioId } = req.params;

    //const studio = Studio.findByPk(studioId);
    /*const studio = await Anime.findByPk(studioId, {
        include: {
            model: Studio,
            attributes: ['name'],
            through: {
                attributes: []
            }
        }
    });
    return studio;*/
    const test = await Anime.findByPk(studioId, {
        include: [
            { model: Genre, attributes: ['name'], through: { attributes: [] } },
            { model: Licensor, attributes: ['name'], through: { attributes: [] } },
            { model: Producer, attributes: ['name'], through: { attributes: [] } },
            { model: Studio, attributes: ['name'], through: { attributes: [] } },
            { model: Theme, attributes: ['name'], through: { attributes: [] } },
            { model: Demographic, attributes: ['name'] },
            { model: Anime, as: 'ChildAnime', attributes: ['id', 'title_romaji', 'image_url'], through: { attributes: ['relation'] } }
        ]
    })
    return test;
}

async function getMultipleStudios(req, reply) {
    return "NYI"
}

async function createStudio(req, reply) {
    return "NYI"
}

async function updateStudio(req, reply) {
    return "NYI"
}

async function deleteStudio(req, reply) {
    return "NYI"
}

module.exports = {
    getOneStudio,
    getMultipleStudios,
    createStudio,
    updateStudio,
    deleteStudio
}