'use strict'

const path = require('path')
const AutoLoad = require('@fastify/autoload')
const dotenv = require('dotenv');
const cors = require('@fastify/cors');
const associations = require('./utils/associations.js');

dotenv.config({ path: './config/config.env' });

module.exports = async function (fastify, opts) {
  // Place here your custom code!
  fastify.register(require('@fastify/cookie'), {
    hook: 'onRequest'
  });

  fastify.register(cors, {
    origin: ['*'],
    credentials: true
  });

  fastify.register(require('@fastify/compress'));
  fastify.register(require('@fastify/helmet'), { global: true });

  // Do not touch the following lines

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
    options: Object.assign({}, opts)
  })

  //This loads all Models defined in models
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'models'),
    options: Object.assign({}, opts)
  })

  // This loads all plugins defined in routes
  // define your routes in one of these
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'routes'),
    options: Object.assign({}, opts)
  })

  //Model associations
  fastify.register(associations);
}
