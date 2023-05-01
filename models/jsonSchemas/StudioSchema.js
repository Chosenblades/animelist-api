const fp = require('fastify-plugin')
const S = require('fluent-json-schema');

function plugin (fastify, options, done) {
    const studioSchema = S.object()
        .id('studioSchema')
        .prop('name', S.string())

    fastify.addSchema(studioSchema);
    done();
}

module.exports = fp(plugin);