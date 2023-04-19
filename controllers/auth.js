const crypto = require('crypto');
const { Op } = require('sequelize');

async function loginUser(req, reply) {

    /** Get user information from request body **/
    const { username, password } = req.body;

    /** Check if both username and password are present **/
    if(!username || !password) {
        return reply.badRequest('Please provide an email and password.');
    }

    /** Find the user - use .unscoped() to remove default scope, so we select password **/
    const user = await this.sequelize.models.User.unscoped().findOne({ where: { username: username }});

    /** Check if user was found **/
    if(!user) {
        return reply.badRequest('Invalid username or password.');
    }

    /** Check if password matches **/
    const isMatch = await user.comparePasswords(password);

    if(!isMatch) {
        return reply.badRequest('Invalid username or password.');
    }

    /** Generate a new JWT **/
    const token = user.getSignedJwtToken();

    let tokenCookieConfigLocalhost = {
        expires: new Date(Date.now() + (30 * 24 * 60 * 60 * 1000)),
        httpOnly: true,
        path: "/"
    }

    return reply.setCookie("token", token, tokenCookieConfigLocalhost)
        .send({ token });
}

async function getMe(req, reply) {
    return req.user;
}

async function forgotPassword(req, reply) {

    /** Get email from request body **/
    const { email } = req.body;

    /** Check if email is present **/
    if(!email) {
        return reply.badRequest('Please provide an email.');
    }

    /** Find the user **/
    const user = await this.sequelize.models.User.findOne({ where: { email: email }});

    /** Check if user is present **/
    if(!user) {
        return reply.badRequest('No account found with that email.');
    }

    /** Generate password reset token **/
    const resetToken = user.getResetPasswordToken;

    /** Save reset token to database **/
    await user.save();

    /** Send email containing a link with the token to reset their password **/
    const resetUrl = `https://domain.com/resetpassword?token=${resetToken}`;
    try {
        /** TODO: email code **/
    } catch(err) {
        return reply.internalServerError();
    }

    /** Send OK response **/
    return { success: true };
}

async function resetPassword(req, reply) {

    /** Get reset token and new password from params **/
    const { resettoken, password } = req.params;

    /** Check if reset token is present **/
    if(!resettoken) {
        return reply.badRequest('No reset token.');
    }

    /** Hash the token **/
    const resetPasswordToken = crypto.createHash('sha256').update(resettoken).digest('hex');

    /** Find the user **/
    const user = await this.sequelize.models.User.findOne({
        where: {
            [Op.and]: [
                { resetPasswordToken: resetPasswordToken },
                { resetPasswordExpire: { [Op.gt]: Date.now() }}
            ]
        }
    });

    /** Make sure user is present **/
    if(!user) {
        return reply.badRequest('Invalid request token');
    }

    /** Update the user's password **/
    user.password = password;
    user.resetPasswordToken = "null";
    user.resetPasswordExpire = Date.now();

    /** Save the user to the database **/
    await user.save();

    /** Reply with OK **/
    return { success: true };
}

module.exports = {
    loginUser,
    getMe,
    forgotPassword,
    resetPassword
}