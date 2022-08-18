'use strict'

/*const AnimeDatabase = require('../../../config/anime-offline-database.json');

const batch1 = AnimeDatabase.splice(0, 4000);
const batch2 = AnimeDatabase.splice(0, 2500);
const batch3 = AnimeDatabase.splice(0, 4000);
const batch4 = AnimeDatabase.splice(0, 4000);
const batch5 = AnimeDatabase.splice(0, 4000);
const batch6 = AnimeDatabase.splice(0, 4000);
const batch7 = AnimeDatabase.splice(0, 4000);
const batch8 = AnimeDatabase.splice(0, 4000);*/

module.exports = async function (fastify, opts) {
    fastify.post('/', async function (request, reply) {
        return 'Not today';
        /*try {
            const anime = await fastify.Anime.bulkCreate(AnimeDatabase, { validate: true });
            console.log(anime.length);
            return 'All anime was inserted into the database.'
        } catch (e) {
            console.log(e);
            return 'Failed';
        }*/
    })
}
