// noinspection JSUnresolvedVariable,JSUnresolvedFunction

async function getOneAnime(req, reply) {
    const { animeId } = req.params;
    const anime = await this.Anime.findByPk(animeId);

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