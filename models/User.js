const { DataTypes, Model } = require('sequelize');
const fp = require('fastify-plugin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

function plugin (fastify, options, done) {
    class User extends Model {
        getSignedJwtToken() {
            return jwt.sign({username: this.username}, process.env.JWT_SECRET, {
                expiresIn: process.env.JWT_EXPIRE
            });
        }
        getResetPasswordToken() {
            const resetToken = crypto.randomBytes(20).toString('hex');

            this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
            this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

            return resetToken;
        }
        async comparePasswords(enteredPassword) {
            return await bcrypt.compare(enteredPassword, this.password);
        }
    }
    User.init({
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: {
                    msg: 'Please enter a valid email.'
                },
                notEmpty: {
                    msg: 'Please enter an email.'
                }
            }
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: {
                    msg: 'Please enter a username.'
                },
                isAlphanumeric: {
                    msg: 'Username must be alphanumeric.'
                },
                len: {
                    args: [3, 16],
                    msg: 'Username must be between 3 and 16 characters.'
                }
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'Please enter a password.'
                },
                len: {
                    args: [6, 256],
                    msg: 'Password must be between 6 and 256 characters.'
                }
            }
        },
        resetPasswordToken: {
            type: DataTypes.STRING
        },
        resetPasswordExpire: {
            type: DataTypes.DATE
        }
    }, {
        defaultScope: {
            attributes: { exclude: ['password'] }
        },
        sequelize: fastify.sequelize
    });

    User.beforeCreate(async (user, options) => {
        //Check if password changed
        if(user.changed('password')) {
            //Hash password
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(user.password, salt);
            user.password = hash;
        }
    });

    /** TODO: Check if updating an existing user's password triggers the beforeCreate hook */

    done();
}

module.exports = fp(plugin);