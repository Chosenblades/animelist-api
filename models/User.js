const fp = require('fastify-plugin');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

function plugin (fastify, options, done) {

    const userSchema = new mongoose.Schema({
        email: {
            type: String,
            required: [true, 'Please enter an email'],
            unique: true,
            match: [
                /^((([!#$%&'*+\-/=?^_`{|}~\w])|([!#$%&'*+\-/=?^_`{|}~\w][!#$%&'*+\-/=?^_`{|}~\.\w]{0,}[!#$%&'*+\-/=?^_`{|}~\w]))[@]\w+([-.]\w+)*\.\w+([-.]\w+)*)$/,
                'Please enter a valid email.'
            ]
        },
        username: {
            type: String,
            required: [true, 'Please enter a username.'],
            unique: true,
            trim: true,
            maxlength: [12, 'Username can not exceed 12 characters.']
        },
        password: {
            type: String,
            required: [true, 'Please enter a password.'],
            minlength: [6, 'Password must be at least 6 characters.'],
            select: false
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        updatedAt: {
            type: Date,
            default: Date.now
        },
        resetPasswordToken: {
            type: String,
            default: "null"
        },
        resetPasswordExpire: {
            type: Date,
            default: Date.now
        }
    });

    userSchema.pre('save', async function(next) {
        //set updatedAt to current date
        this.updatedAt = Date.now();

        //If password isn't being changed, don't do anything
        if(!this.isModified('password')) {
            next();
        }

        //Hash password
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);

        next();
    });

    userSchema.methods.getSignedJwtToken = function() {
        return jwt.sign({username: this.username}, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRE
        });
    }

    userSchema.methods.comparePasswords = async function(enteredPassword) {
        return await bcrypt.compare(enteredPassword, this.password);
    }

    userSchema.methods.getResetPasswordToken = function() {
        const resetToken = crypto.randomBytes(20).toString('hex');

        this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
        this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

        return resetToken;
    }

    const User = mongoose.model('User', userSchema);

    fastify.decorate("User", User);

    done();
}

module.exports = fp(plugin)
