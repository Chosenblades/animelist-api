
async function getOnePerson(req, reply) {
    const { Person } = this.sequelize.models;

    const { personId } = req.params;

    const person = await Person.findByPk(personId);

    if(person === null) {
        reply.notFound();
    } else {
        reply.header('Cache-Control', 'max-age=64000, public');
        return person;
    }
}

async function getMultiplePeople(req, reply) {
    const { Person } = this.sequelize.models;

    const people = await Person.findAll({ limit: 30 })

    if(people === null) {
        reply.notFound();
    } else {
        reply.header('Cache-Control', 'max-age=64000, public');
        return people;
    }
}

async function getPersonCharacters(req, reply) {
    const { Character, Person, Anime } = this.sequelize.models;

    const { personId } = req.params;

    /*const characters = await Person.findByPk(personId, {
        attributes: [],
        include: [
            { model: Character, attributes: ['id', 'name', 'image_url'], through: { attributes: ['language'] }, include: [
                    { model: Anime, attributes: ['id', 'title_romaji', 'image_url'], through: { attributes: ['type'] } }
                ] },
        ]
    });*/

    const characters = await Person.findByPk(personId, {
        attributes: [],
        include: [
            { model: Character, attributes: ['id', 'name', 'image_url'], through: { attributes: ['language'] } }
        ]
    })

    if(characters === null) {
        reply.notFound();
    } else {
        reply.header('Cache-Control', 'max-age=64000, public');
        return characters;
    }
}

module.exports = { getOnePerson, getMultiplePeople, getPersonCharacters };
