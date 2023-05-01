const fp = require('fastify-plugin')
const S = require('fluent-json-schema');

function plugin (fastify, options, done) {
    const animeRelationSchema = S.object()
        .id('animeRelationSchema')
        .prop('name', S.string())

    fastify.addSchema(animeRelationSchema);
    done();
}

module.exports = fp(plugin);