'use strict'

const fp = require('fastify-plugin');
const jwt = require("jsonwebtoken");

async function plugin(fastify, options, done) {
    //Auth decorators
    fastify.decorate('asyncVerifyJWTandUser', asyncVerifyJWTandUser);

    //Register auth plugin
    fastify.register(require('@fastify/auth'));

    done();

    async function asyncVerifyJWTandUser(req, reply, done) {
        let token;

        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if(!token) {
            return done(new Error('Not authorized.'));
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            const user = await fastify.User.findOne({ username: decoded.username });

            if(!user) {
                return done(new Error('Not authorized.'));
            }

            req.user = user;
            return done();

        } catch(err) {
            return done(new Error('Not authorized.'));
        }
    }
}

module.exports = fp(plugin);