const fp = require('fastify-plugin')
const S = require('fluent-json-schema');

function plugin (fastify, options, done) {
    const demographicSchema = S.object()
        .id('demographicSchema')
        .prop('name', S.string())

    fastify.addSchema(demographicSchema);
    done();
}

module.exports = fp(plugin);