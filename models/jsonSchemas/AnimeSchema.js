const fp = require('fastify-plugin')
const S = require('fluent-json-schema');

function plugin (fastify, options, done) {
    const animeSchema = S.object()
        .id('animeSchema')
        .prop('id', S.anyOf([S.number(), S.null()]))
        .prop('synopsis', S.anyOf([S.string(), S.null()]))
        .prop('image_url', S.anyOf([S.string(), S.null()]))
        .prop('title_synonyms', S.anyOf([S.string(), S.null()]))
        .prop('title_romaji', S.anyOf([S.string(), S.null()]))
        .prop('title_japanese', S.anyOf([S.string(), S.null()]))
        .prop('title_english', S.anyOf([S.string(), S.null()]))
        .prop('title_german', S.anyOf([S.string(), S.null()]))
        .prop('title_spanish', S.anyOf([S.string(), S.null()]))
        .prop('title_french', S.anyOf([S.string(), S.null()]))
        .prop('type', S.anyOf([S.enum(["TV", "Movie", "OVA", "Special", "ONA"]), S.null()]))
        .prop('episodes', S.anyOf([S.number(), S.null()]))
        .prop('status', S.anyOf([S.enum(["Finished Airing", "Currently Airing", "Not yet aired"]), S.null()]))
        .prop('aired', S.anyOf([S.string(), S.null()]))
        .prop('season', S.anyOf([S.enum(["Spring", "Summer", "Fall", "Winter"]), S.null()]))
        .prop('year', S.anyOf([S.number(), S.null()]))
        .prop('broadcast', S.anyOf([S.string(), S.null()]))
        .prop('source', S.anyOf([S.enum(["Original", "Manga", "Light novel", "Game", "Visual novel", "4-koma manga", "Novel", "Other", "Unknown", "Picture book", "Web manga", "Music", "Radio", "Book", "Card game", "Mixed media", "Web novel"]), S.null()]))
        .prop('rating', S.anyOf([S.enum(["R - 17+ (violence & profanity)", "PG-13 - Teens 13 or older", "PG - Children", "R+ - Mild Nudity", "G - All Ages", "Rx - Hentai", "None"]), S.null()]))
        .prop('Genres', S.anyOf([S.array().items(S.ref('genreSchema')), S.null()]))
        .prop('Producers', S.anyOf([S.array().items(S.ref('producerSchema')), S.null()]))
        .prop('Licensors', S.anyOf([S.array().items(S.ref('licensorSchema')), S.null()]))
        .prop('Studios', S.anyOf([S.array().items(S.ref('studioSchema')), S.null()]))
        .prop('Themes', S.anyOf([S.array().items(S.ref('themeSchema')), S.null()]))
        .prop('Demographic', S.anyOf([S.ref('genreSchema'), S.null()]))
        .prop('ChildAnime', S.anyOf([S.array().items(S.ref('childAnimeSchema')), S.null()]))

    fastify.addSchema(animeSchema);
    done();
}

module.exports = fp(plugin);