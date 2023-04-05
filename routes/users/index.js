'use strict'

const { getOneUser, getMultipleUsers, createUser, updateUser, deleteUser } = require('../../controllers/users.js');

const UsersSchema = {
    $id: 'usersSchema',
    type: 'object',
    properties: {
        email: { type: 'string' },
        username: { type: 'string' },
        password: { type: 'string' },
        createdAt: { type: 'string' },
        updatedAt: { type: 'string' },
        resetPasswordToken: { type: 'string' },
        resetPasswordExpire: { type: 'string' }
    }
}

const getOneUserOptions = {
    schema: {
        response: {
            '2xx': { $ref: 'usersSchema' }
        },
        params: {
            type: 'object',
            properties: {
                username: { type: 'string' }
            }
        }
    }
}

const getMultipleUsersOptions = {
    schema: {
        response: {
            '2xx': {
                type: 'array',
                items: { $ref: 'usersSchema' }
            }
        }
    }
}

const createUserOptions = {
    schema: {
        response: {
            '2xx': {
                type: 'string'
            }
        },
        body: { $ref: 'usersSchema' }
    }
}

const updateUserOptions = {
    schema: {
        response: {
            '2xx': {
                type: 'string'
            }
        }
    }
}

const deleteUserOptions = {
    schema: {
        response: {
            '2xx': {
                type: 'string'
            }
        }
    }
}

/**
 *
 * @param fastify
 * @param fastify.get
 * @param fastify.delete
 * @param fastify.put
 * @param fastify.post
 * @param fastify.User
 * @param opts
 * @returns {Promise<void>}
 */
module.exports = async function (fastify, opts) {

    fastify.addSchema(UsersSchema);

    fastify.get('/:UsersId', getOneUserOptions, getOneUser);
    fastify.get('/', { getMultipleUsersOptions }, getMultipleUsers);
    fastify.post('/', { createUserOptions }, createUser);
    fastify.put('/:UsersId', { updateUserOptions }, updateUser);
    fastify.delete('/:UsersId', { deleteUserOptions }, deleteUser);
}