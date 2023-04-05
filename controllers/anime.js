

async function getOneAnime(req, reply) {
    const { animeTitle } = req.params;
    const anime = await this.Anime.findOne({ title: animeTitle });

    if(!anime) {
        return reply.notFound();
    }

    return anime;
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

async function searchAnime(req, reply) {
    return "NYI"
}

module.exports = {
    getOneAnime,
    getMultipleAnime,
    createAnime,
    updateAnime,
    deleteAnime,
    searchAnime
}