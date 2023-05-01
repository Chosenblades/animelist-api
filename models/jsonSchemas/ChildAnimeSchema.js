const fp = require('fastify-plugin')
const S = require('fluent-json-schema');

function plugin (fastify, options, done) {
    const childAnimeSchema = S.object()
        .id('childAnimeSchema')
        .prop('id', S.number())
        .prop('title_romaji', S.string())
        .prop('image_url', S.string())
        .prop('AnimeRelations', S.ref('animeRelationSchema'))

    fastify.addSchema(childAnimeSchema);
    done();
}

module.exports = fp(plugin);