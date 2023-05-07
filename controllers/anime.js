// noinspection JSUnresolvedVariable,JSUnresolvedFunction

async function getOneAnime(req, reply) {
    const { Anime, Character, Demographic, Genre, Licensor, Producer, Staff, Studio, Theme } = this.sequelize.models;

    const { animeId } = req.params;
    /*const anime = await Anime.findByPk(animeId, {
        include: [
            { model: Genre, attributes: ['id', 'name'], through: { attributes: [] } },
            { model: Licensor, attributes: ['id', 'name'], through: { attributes: [] } },
            { model: Producer, attributes: ['id', 'name'], through: { attributes: [] } },
            { model: Studio, attributes: ['id', 'name'], through: { attributes: [] } },
            { model: Theme, attributes: ['id', 'name'], through: { attributes: [] } },
            { model: Demographic, attributes: ['id', 'name'] },
            { model: Anime, as: 'ChildAnime', attributes: ['id', 'title_romaji', 'image_url'], through: { attributes: ['relation'] } }
        ]
    })*/

    const anime = await Anime.findByPk(animeId);

    if(anime === null) {
        reply.notFound();
    } else {
        reply.header('Cache-Control', 'max-age=64000, public');
        return anime;
    }
}

async function searchAnime(req, reply) {
    const { Anime, Character, Demographic, Genre, Licensor, Producer, Staff, Studio, Theme } = this.sequelize.models;

    const { title } = req.query;
    const anime = Anime.findAll({
        attributes: ['id', 'title_romaji', 'image_url', 'type', this.sequelize.literal('MATCH (title_romaji, title_english, title_synonyms) AGAINST (:name) AS score')],
        limit: 10,
        where: this.sequelize.literal('MATCH (title_romaji, title_english, title_synonyms) AGAINST (:name)'),
        replacements: {
            name: title
        },
        //order: [[this.sequelize.literal('score'), 'DESC']]
    });

    if(anime === null) {
        reply.notFound();
    } else {
        reply.header('Cache-Control', 'max-age=64000, public');
        return anime;
    }
}

async function getAnimeRelations(req, reply) {
    const { Anime } = this.sequelize.models;

    const { animeId } = req.params;

    const anime = await Anime.findByPk(animeId, {
        attributes: [],
        include: [
            { model: Anime, as: 'ChildAnime', attributes: ['id', 'title_romaji', 'image_url'], through: { attributes: ['relation'] } }
        ]
    });

    if(anime === null) {
        reply.notFound();
    } else {
        reply.header('Cache-Control', 'max-age=64000, public');
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
    deleteAnime,
    searchAnime,
    getAnimeRelations
}