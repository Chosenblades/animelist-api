// noinspection JSUnresolvedVariable,JSUnresolvedFunction

async function getOneAnime(req, reply) {
    const { Anime, Character, Demographic, Genre, Licensor, Producer, Staff, Studio, Theme } = this.sequelize.models;

    const { animeId } = req.params;
    const anime = await Anime.findByPk(animeId, {
        include: Studio
    });
    /*const anime = await Anime.findOne(
        {
            where: { id: animeId },
            include: [
                {
                    model: Anime,
                    as: 'ChildAnime'
                }
            ]
        }
    );*/

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