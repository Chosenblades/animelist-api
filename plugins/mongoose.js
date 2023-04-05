const fp = require('fastify-plugin');
const mongoose = require('mongoose');

async function plugin (fastify, options, done) {
    const MONGO_URI = process.env.MONGO_URI || null;

    await mongoose.connect(MONGO_URI, {
        useNewUrlParser: true
    });

    fastify.log.info("Connected to MongoDB.");

    decorate();

    done();

    function decorate() {
        fastify.decorate('mongoose', mongoose);
        fastify.addHook('onClose', (app, done) => {
            app.mongoose.connection.on("close", function () {
                done();
            });
            app.mongoose.connection.close();
        })
    }
}

module.exports = fp(plugin);