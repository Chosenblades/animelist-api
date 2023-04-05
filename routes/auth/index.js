'use strict'

const { loginUser, getMe, forgotPassword, resetPassword } = require('../../controllers/auth');

/**
 *
 * @param fastify
 * @param fastify.get
 * @param fastify.delete
 * @param fastify.put
 * @param fastify.post
 * @param fastify.auth
 * @param fastify.asyncVerifyJWTandUser
 * @param opts
 * @returns {Promise<void>}
 */
module.exports = async function (fastify, opts) {

    //fastify.addSchema(UsersSchema);

    fastify.post('/login', loginUser);
    fastify.post('/me', {
        preHandler: fastify.auth([
            fastify.asyncVerifyJWTandUser
        ])
    }, getMe);
    fastify.post('/forgotpassword', forgotPassword);
    fastify.put('/resetpassword/:resettoken', resetPassword);
}