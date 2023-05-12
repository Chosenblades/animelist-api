const fp = require('fastify-plugin')
const S = require('fluent-json-schema');

function plugin (fastify, options, done) {
    const animeStaffSchema = S.object()
        .id('animeStaffSchema')
        .prop('roles', S.string())

    fastify.addSchema(animeStaffSchema);
    done();
}

module.exports = fp(plugin);