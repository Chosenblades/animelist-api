const fp = require('fastify-plugin')
const S = require('fluent-json-schema');

function plugin (fastify, options, done) {
    const animeCharacterSchema = S.object()
        .id('animeCharacterSchema')
        .prop('type', S.string())

    fastify.addSchema(animeCharacterSchema);
    done();
}

module.exports = fp(plugin);