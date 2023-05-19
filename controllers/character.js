
async function getOneCharacter(req, reply) {
    const { Character } = this.sequelize.models;

    const { characterId } = req.params;

    const character = await Character.findByPk(characterId);

    if(character === null) {
        reply.notFound();
    } else {
        reply.header('Cache-Control', 'max-age=64000, public');
        return character;
    }
}

async function getMultipleCharacters(req, reply) {
    const { Character } = this.sequelize.models;

    const characters = await Character.findAll({ limit: 30 })

    if(characters === null) {
        reply.notFound();
    } else {
        reply.header('Cache-Control', 'max-age=64000, public');
        return characters;
    }
}

async function getCharactersAnime(req, reply) {
    const { Character, Anime } = this.sequelize.models;

    const { characterId } = req.params;

    const characters = await Character.findByPk(characterId, {
        attributes: [],
        include: [
            { model: Anime, attributes: ['id', 'title_romaji', 'image_url'], through: { attributes: [] } },
        ]
    });

    if(characters === null) {
        reply.notFound();
    } else {
        reply.header('Cache-Control', 'max-age=64000, public');
        return characters;
    }
}

async function getCharactersPeople(req, reply) {
    const { Character, Person } = this.sequelize.models;

    const { characterId } = req.params;

    const characters = await Character.findByPk(characterId, {
        attributes: [],
        include: [
            { model: Person, attributes: ['id', 'name', 'image_url'], through: { attributes: ['language'] } },
        ]
    });

    if(characters === null) {
        reply.notFound();
    } else {
        reply.header('Cache-Control', 'max-age=64000, public');
        return characters;
    }
}

module.exports = { getOneCharacter, getMultipleCharacters, getCharactersAnime, getCharactersPeople };
