const fp = require('fastify-plugin')
const S = require('fluent-json-schema');

function plugin (fastify, options, done) {
    const genreSchema = S.object()
        .id('genreSchema')
        .prop('id', S.number())
        .prop('name', S.string())

    fastify.addSchema(genreSchema);
    done();
}

module.exports = fp(plugin);