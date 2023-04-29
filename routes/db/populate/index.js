'use strict'

const animejson = require('../../../config/data/anime.json');
const characters = require('../../../config/data/characters.json');
const demographics = require('../../../config/data/demographics.json');
const genres = require('../../../config/data/genres.json');
const licensors = require('../../../config/data/licensors.json');
const producers = require('../../../config/data/producers.json');
const people = require('../../../config/data/people.json');
const studios = require('../../../config/data/studios.json');
const themes = require('../../../config/data/themes.json');
const voiceactors = require('../../../config/data/charactervoiceactorrelations.json');
const animeRelationsjson = require('../../../config/data/animeRelations.json');
const animeCharRelations = require('../../../config/data/animecharrelations.json');
const animeGenreRelations = require('../../../config/data/genreRelations.json');
const animeLicensorRelations = require('../../../config/data/licensorRelations.json');
const animeProducerRelations = require('../../../config/data/producerRelations.json');
const animeStaffRelations = require('../../../config/data/animestaffrelations.json');
const animeStudioRelations = require('../../../config/data/studioRelations.json');
const animeThemeRelations = require('../../../config/data/themeRelations.json');
const characterVoiceActorRelations = require('../../../config/data/charactervoiceactorrelations.json');


module.exports = async function (fastify, opts) {

    const { Anime, AnimeRelations, Demographic, Genre, AnimeGenres, Licensor, AnimeLicensors, Producer, AnimeProducers, Studio, AnimeStudios, Theme, AnimeThemes, Character, Person, AnimeCharacters, AnimeStaff, CharacterVoiceActors } = fastify.sequelize.models;

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

    fastify.post('/characters', async function (request, reply) {

        while(characters.length > 1000) {
            const slice = characters.splice(0, 1000);
            const batch = await Character.bulkCreate(slice);
        }

        if(characters.length > 0) {
            const batch = await Character.bulkCreate(characters);
        }

        return "All characters inserted.";
    });


    fastify.post('/demographics', async function (request, reply) {

        while(demographics.length > 1000) {
            const slice = demographics.splice(0, 1000);
            const batch = await Demographic.bulkCreate(slice);
        }

        if(demographics.length > 0) {
            const batch = await Demographic.bulkCreate(demographics);
        }

        return "All demographics inserted.";
    });

    fastify.post('/genres', async function (request, reply) {

        while(genres.length > 1000) {
            const slice = genres.splice(0, 1000);
            const batch = await Genre.bulkCreate(slice);
        }

        if(genres.length > 0) {
            const batch = await Genre.bulkCreate(genres);
        }

        return "All genres inserted.";
    });

    fastify.post('/licensors', async function (request, reply) {

        while(licensors.length > 1000) {
            const slice = licensors.splice(0, 1000);
            const batch = await Licensor.bulkCreate(slice);
        }

        if(licensors.length > 0) {
            const batch = await Licensor.bulkCreate(licensors);
        }

        return "All licensors inserted.";
    });

    fastify.post('/producers', async function (request, reply) {

        while(producers.length > 1000) {
            const slice = producers.splice(0, 1000);
            const batch = await Producer.bulkCreate(slice);
        }

        if(producers.length > 0) {
            const batch = await Producer.bulkCreate(producers);
        }

        return "All producers inserted.";
    });

    fastify.post('/studios', async function (request, reply) {

        while(studios.length > 1000) {
            const slice = studios.splice(0, 1000);
            const batch = await Studio.bulkCreate(slice);
        }

        if(studios.length > 0) {
            const batch = await Studio.bulkCreate(studios);
        }

        return "All studios inserted.";
    });

    fastify.post('/themes', async function (request, reply) {

        while(themes.length > 1000) {
            const slice = themes.splice(0, 1000);
            const batch = await Theme.bulkCreate(slice);
        }

        if(themes.length > 0) {
            const batch = await Theme.bulkCreate(themes);
        }

        return "All themes inserted.";
    });

    fastify.post('/people', async function (request, reply) {

        while(people.length > 1000) {
            const slice = people.splice(0, 1000);
            const batch = await Person.bulkCreate(slice);
        }

        if(people.length > 0) {
            const batch = await Person.bulkCreate(people);
        }

        return "All people inserted.";
    });


    fastify.post('/animerelations', async function (request, reply) {

        while(animeRelationsjson.length > 1000) {
            const slice = animeRelationsjson.splice(0, 1000);
            const batch = await AnimeRelations.bulkCreate(slice);
        }

        if(animeRelationsjson.length > 0) {
            const batch = await AnimeRelations.bulkCreate(animeRelationsjson);
        }

        return "All anime relations inserted.";
    });

    fastify.post('/characterrelations', async function (request, reply) {

        while(animeCharRelations.length > 1000) {
            const slice = animeCharRelations.splice(0, 1000);
            const batch = await AnimeCharacters.bulkCreate(slice);
        }

        if(animeCharRelations.length > 0) {
            const batch = await AnimeCharacters.bulkCreate(animeCharRelations);
        }

        return "All anime character relations inserted.";
    });

    fastify.post('/staffrelations', async function (request, reply) {

        while(animeStaffRelations.length > 1000) {
            const slice = animeStaffRelations.splice(0, 1000);
            const batch = await AnimeStaff.bulkCreate(slice);
        }

        if(animeStaffRelations.length > 0) {
            const batch = await AnimeStaff.bulkCreate(animeStaffRelations);
        }

        return "All anime staff relations inserted.";
    });

    fastify.post('/genrerelations', async function (request, reply) {

        while(animeGenreRelations.length > 1000) {
            const slice = animeGenreRelations.splice(0, 1000);
            const batch = await AnimeGenres.bulkCreate(slice);
        }

        if(animeGenreRelations.length > 0) {
            const batch = await AnimeGenres.bulkCreate(animeGenreRelations);
        }

        return "All anime genre relations inserted.";
    });

    fastify.post('/licensorrelations', async function (request, reply) {

        while(animeLicensorRelations.length > 1000) {
            const slice = animeLicensorRelations.splice(0, 1000);
            const batch = await AnimeLicensors.bulkCreate(slice);
        }

        if(animeLicensorRelations.length > 0) {
            const batch = await AnimeLicensors.bulkCreate(animeLicensorRelations);
        }

        return "All anime licensor relations inserted.";
    });

    fastify.post('/producerrelations', async function (request, reply) {

        while(animeProducerRelations.length > 1000) {
            const slice = animeProducerRelations.splice(0, 1000);
            const batch = await AnimeProducers.bulkCreate(slice);
        }

        if(animeProducerRelations.length > 0) {
            const batch = await AnimeProducers.bulkCreate(animeProducerRelations);
        }

        return "All anime producer relations inserted.";
    });

    fastify.post('/studiorelations', async function (request, reply) {

        while(animeStudioRelations.length > 1000) {
            const slice = animeStudioRelations.splice(0, 1000);
            const batch = await AnimeStudios.bulkCreate(slice);
        }

        if(animeStudioRelations.length > 0) {
            const batch = await AnimeStudios.bulkCreate(animeStudioRelations);
        }

        return "All anime studio relations inserted.";
    });

    fastify.post('/themerelations', async function (request, reply) {

        while(animeThemeRelations.length > 1000) {
            const slice = animeThemeRelations.splice(0, 1000);
            const batch = await AnimeThemes.bulkCreate(slice);
        }

        if(animeThemeRelations.length > 0) {
            const batch = await AnimeThemes.bulkCreate(animeThemeRelations);
        }

        return "All anime theme relations inserted.";
    });

    fastify.post('/voiceactors', async function (request, reply) {

        while(voiceactors.length > 1000) {
            const slice = voiceactors.splice(0, 1000);
            const batch = await CharacterVoiceActors.bulkCreate(slice);
        }

        if(voiceactors.length > 0) {
            const batch = await CharacterVoiceActors.bulkCreate(voiceactors);
        }

        return "All voice actors inserted.";
    });
}
