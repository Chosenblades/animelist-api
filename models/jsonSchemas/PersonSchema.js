const fp = require('fastify-plugin')
const S = require('fluent-json-schema');

function plugin (fastify, options, done) {
    const personSchema = S.object()
        .id('personSchema')
        .prop('id', S.number())
        .prop('name', S.string())
        .prop('image_url', S.string())
        .prop('AnimeStaff', S.ref('animeStaffSchema'))

    fastify.addSchema(personSchema);
    done();
}

module.exports = fp(plugin);