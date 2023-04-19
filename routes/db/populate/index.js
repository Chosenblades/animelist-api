'use strict'

const animejson = require('../../../config/data/anime.json');
const characters = require('../../../config/data/anime.json');
const demographics = require('../../../config/data/anime.json');
const genres = require('../../../config/data/anime.json');
const licensors = require('../../../config/data/anime.json');
const producers = require('../../../config/data/anime.json');
const staff = require('../../../config/data/anime.json');
const studios = require('../../../config/data/anime.json');
const themes = require('../../../config/data/anime.json');
/*const animejson = require('../../../config/data/anime.json');
const animejson = require('../../../config/data/anime.json');
const animejson = require('../../../config/data/anime.json');
const animejson = require('../../../config/data/anime.json');
const animejson = require('../../../config/data/anime.json');
const animejson = require('../../../config/data/anime.json');
const animejson = require('../../../config/data/anime.json');
const animejson = require('../../../config/data/anime.json');*/


module.exports = async function (fastify, opts) {

    const { Anime } = fastify.sequelize.models;

    fastify.post('/anime', async function (request, reply) {
        while(animejson.length > 1000) {
            const slice = animejson.splice(0, 1000);
            const batch = await Anime.bulkCreate(slice);
        }

        if(animejson.length > 0) {
            const batch = await Anime.bulkCreate(animejson);
        }

        return "All anime inserted.";
    });
}
