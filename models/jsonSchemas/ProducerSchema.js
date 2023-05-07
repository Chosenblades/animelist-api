const fp = require('fastify-plugin')
const S = require('fluent-json-schema');

function plugin (fastify, options, done) {
    const producerSchema = S.object()
        .id('producerSchema')
        .prop('id', S.number())
        .prop('name', S.string())

    fastify.addSchema(producerSchema);
    done();
}

module.exports = fp(plugin);