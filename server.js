'use strict'

const Fastify = require('fastify');
const closeWithGrace = require('close-with-grace');

const app = Fastify({
    logger: true
});

const appService = require('./app.js');
app.register(appService);

const closeListeners = closeWithGrace({ delay: 500 }, async function ({ signal, err, manual }) {
    if(err) {
        app.log.error(err)
    }
    await app.close();
});

app.addHook('onClose', (instance, done) => {
    closeListeners.uninstall;
    done();
});

app.listen({ port: process.env.PORT || 3000, host: '0.0.0.0' }, (err) => {
    if(err) {
        app.log.error(err);
        process.exit(1);
    }
});