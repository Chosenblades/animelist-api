const fp = require('fastify-plugin')
const S = require('fluent-json-schema');

function plugin (fastify, options, done) {
    const themeSchema = S.object()
        .id('themeSchema')
        .prop('name', S.string())

    fastify.addSchema(themeSchema);
    done();
}

module.exports = fp(plugin);