const { tokenCookieConfig, tokenCookieConfigLocalhost } = require('../config/cookiesConfig.js');

async function getOneUser(req, reply) {
    //disabled for security
    reply.methodNotAllowed();
}

async function getMultipleUsers(req, reply) {
    //disabled for security
    reply.methodNotAllowed();
}

async function createUser(req, reply) {
    try {
        /** Get user information from request body **/
        const { email, username, password } = req.body;

        console.log(email);

        /** Use mongoose to attempt to create user **/
        const user = await this.User.create({ email, username, password });

        /** If user creation succeeded, create JWT token **/
        const token = user.getSignedJwtToken();

        /** Send success reply with JWT token **/
        /** TODO: add domain: 'example.com' for production */
        return reply.setCookie("token", token, tokenCookieConfigLocalhost)
            .send({ token });

    } catch (err) {
        console.log(err);

        //Duplicate key error
        if(err.code === 11000) {
            if(err.keyValue.username) {
                return reply.badRequest('Username not available.');
            } else if(err.keyValue.email) {
                return reply.badRequest('Email not available.');
            }
        }

        //Validation error
        if(err.name === 'ValidationError') {
            return reply.badRequest(Object.values(err.errors).map(val => val.message).join(','));
        }

        //Anything else
        return reply.badRequest('Error occurred.');
    }


}

async function updateUser(req, reply) {
    //disabled for security
    reply.notAuthorized();
}

async function deleteUser(req, reply) {
    //disabled for security
    reply.methodNotAllowed();
}

module.exports = {
    getOneUser,
    getMultipleUsers,
    createUser,
    updateUser,
    deleteUser
}