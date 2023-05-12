const fp = require('fastify-plugin')
const S = require('fluent-json-schema');

function plugin (fastify, options, done) {
    const characterSchema = S.object()
        .id('characterSchema')
        .prop('id', S.number())
        .prop('name', S.string())
        .prop('image_url', S.string())
        .prop('AnimeCharacters', S.ref('animeCharacterSchema'))
        .prop('People', S.anyOf([S.array().items(S.ref('personSchema')), S.null()]))

    fastify.addSchema(characterSchema);
    done();
}

module.exports = fp(plugin);