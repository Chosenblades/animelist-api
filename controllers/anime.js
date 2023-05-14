// noinspection JSUnresolvedVariable,JSUnresolvedFunction
const { Op } = require('sequelize');

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
        attributes: ['id', 'title_romaji', 'image_url', 'type',
            //this.sequelize.literal('MATCH (title_romaji, title_english, title_synonyms) AGAINST (:name) AS score'),
            this.sequelize.literal('MATCH (title_romaji) AGAINST (:name) AS romaji_score'),
            this.sequelize.literal('MATCH (title_english) AGAINST (:name) AS english_score'),
            this.sequelize.literal('MATCH (title_synonyms) AGAINST (:name) AS synonyms_score'),
        ],
        limit: 10,
        where: this.sequelize.literal('MATCH (title_romaji, title_english, title_synonyms) AGAINST (:name)'),
        //having: this.sequelize.literal('score > 20'),
        //order: [[this.sequelize.literal('score'), 'DESC']]
        order: [
            //[this.sequelize.literal('ABS( LENGTH(:name) - LENGTH(title_romaji) )')],
            //[this.sequelize.literal('ABS( LENGTH(:name) - LENGTH(title_english) )')],
            //[this.sequelize.literal('score'), 'DESC']
            //"ORDER BY ('{$str_search}%' LIKE title) DESC"
            [this.sequelize.literal(`${this.sequelize.escape(title)} LIKE title_romaji`), 'DESC'],
            [this.sequelize.literal(`${this.sequelize.escape(title)} LIKE title_english`), 'DESC'],
            [this.sequelize.literal(`${this.sequelize.escape(title + '%')} LIKE title_romaji`), 'DESC'],
            [this.sequelize.literal(`${this.sequelize.escape(title + '%')} LIKE title_english`), 'DESC'],
            [this.sequelize.literal('(romaji_score*2)+(english_score*2)+(synonyms_score)'), 'DESC'],
        ],
        replacements: {
            name: title
        },
    });

    /*
    SELECT field1, field2, field3, title, body,
MATCH (title) AGAINST ('word_to_search') AS rel_title,
MATCH (body) AGAINST ('word_to_search') AS rel_body
FROM table_to_use
WHERE MATCH (title,body) AGAINST ('word_to_search')
ORDER BY (rel_title*2)+(rel_body)
     */

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
            { model: Anime, as: 'ChildAnime', attributes: ['id', 'title_romaji', 'image_url'], through: { attributes: ['relation', 'childAnimeId'] } }
        ]
    });

    if(anime === null) {
        reply.notFound();
    } else {
        reply.header('Cache-Control', 'max-age=64000, public');
        return anime;
    }
}

async function getAnimeCharacters(req, reply) {
    const { Character, Anime, Person, AnimeCharacters } = this.sequelize.models;

    const { animeId } = req.params;

    const characters = await Anime.findByPk(animeId, {
        attributes: [],
        include: [
            { model: Character, attributes: ['id', 'name', 'image_url'], through: { attributes: ['type'] }, include: [
                    { model: Person, attributes: ['id', 'name', 'image_url'], through: { attributes: ['language'], where: { language: 'Japanese'}}}
                ] }
        ],
        order: [
            [Character, AnimeCharacters, 'type', 'ASC']
        ]
    });

    if(characters === null) {
        reply.notFound();
    } else {
        reply.header('Cache-Control', 'max-age=64000, public');
        return characters;
    }
}

async function getAnimeStaff(req, reply) {
    const { Person, Anime } = this.sequelize.models;

    const { animeId } = req.params;

    const staff = await Anime.findByPk(animeId, {
        attributes: [],
        include: [
            { model: Person, attributes: ['id', 'name', 'image_url'], through: { attributes: ['roles'] } }
        ]
    });

    if(staff === null) {
        reply.notFound();
    } else {
        reply.header('Cache-Control', 'max-age=64000, public');
        return staff;
    }
}

function getMultipleAnime(req, reply) {
    const { Anime, Character, Demographic, Genre, Licensor, Producer, Person, Studio, Theme } = this.sequelize.models;
    const { title, genres, years, seasons, types, statuses, demographic, licensors, producers, staff, characters, studios, themes } = req.query;

    let attributes = ['id', 'title_romaji', 'image_url', 'type'];
    let where = [];
    let replacements = {};
    let include = [];

    if(title) {
        attributes.push(this.sequelize.literal('MATCH (title_romaji, title_english, title_synonyms) AGAINST (:name) AS score'));
        where.push(this.sequelize.literal('MATCH (title_romaji, title_english, title_synonyms) AGAINST (:name)'));
        replacements = { name: title }
    }

    if(genres) {
        include.push({ model: Genre, attributes: [], through: { attributes: [] }, where: { name: { [Op.in]: genres } } });
    }

    if(years) {
        where.push({ year: { [Op.in]: years } });
    }

    if(seasons) {
        where.push({ season: { [Op.in]: seasons } });
    }

    if(types) {
        where.push({ type: { [Op.in]: types } });
    }

    if(statuses) {
        where.push({ status: { [Op.in]: statuses } });
    }

    if(demographic) {
        include.push({ model: Demographic, attributes: [], where: { name: demographic } });
    }

    if(licensors) {
        include.push({ model: Licensor, attributes: [], through: { attributes: [] }, where: { name: { [Op.in]: licensors } } });
    }

    if(producers) {
        include.push({ model: Producer, attributes: [], through: { attributes: [] }, where: { name: { [Op.in]: producers } } });
    }

    if(staff) {
        include.push({ model: Person, attributes: [], through: { attributes: [] }, where: { name: { [Op.in]: staff } } });
    }

    if(characters) {
        include.push({ model: Character, attributes: [], through: { attributes: [] }, where: { name: { [Op.in]: characters } } });
    }

    if(studios) {
        include.push({ model: Studio, attributes: [], through: { attributes: [] }, where: { name: { [Op.in]: studios } } });
    }

    if(themes) {
        include.push({ model: Theme, attributes: [], through: { attributes: [] }, where: { name: { [Op.in]: themes } } });
    }

    console.log(where);

    const anime = Anime.findAll({
        attributes: attributes,
        limit: 10,
        where: { [Op.and]: where },
        replacements: replacements,
        include: include,
        //order: [[this.sequelize.literal('score'), 'DESC']]
    });

    if(anime === null) {
        reply.notFound();
    } else {
        reply.header('Cache-Control', 'max-age=64000, public');
        return anime;
    }
}

async function getAnimeYears(req, reply) {
    const { Anime } = this.sequelize.models;
    const years = Anime.findOne({
        attributes: [
            [this.sequelize.fn('MIN', this.sequelize.col('year')), 'min_years'],
            [this.sequelize.fn('MAX', this.sequelize.col('year')), 'max_years']
        ]
    });
    return years;
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
    getAnimeRelations,
    getAnimeCharacters,
    getAnimeStaff,
    getAnimeYears
}