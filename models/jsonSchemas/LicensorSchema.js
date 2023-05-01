const fp = require('fastify-plugin')
const S = require('fluent-json-schema');

function plugin (fastify, options, done) {
    const licensorSchema = S.object()
        .id('licensorSchema')
        .prop('name', S.string())

    fastify.addSchema(licensorSchema);
    done();
}

module.exports = fp(plugin);