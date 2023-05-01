// noinspection JSUnresolvedVariable,JSUnresolvedFunction

async function getOneAnime(req, reply) {
    const { Anime, Character, Demographic, Genre, Licensor, Producer, Staff, Studio, Theme } = this.sequelize.models;

    const { animeId } = req.params;
    const anime = await Anime.findByPk(animeId, {
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

    if(anime === null) {
        reply.notFound();
    } else {
        return anime;
    }
}

function getMultipleAnime(req, reply) {
    return "NYI"
}

function createAnime(req, reply) {
    return "NYI"
}

function updateAnime(req, reply) {
    return "NYI"
}

function deleteAnime(req, reply) {
    return "NYI"
}

module.exports = {
    getOneAnime,
    getMultipleAnime,
    createAnime,
    updateAnime,
    deleteAnime
}