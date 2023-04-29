let tokenCookieConfig = {
    expires: new Date(Date.now() + (30 * 24 * 60 * 60 * 1000)),
    httpOnly: true,
    sameSite: true,
    secure: true,
    domain: "asdf.com",
    path: "/"
}

let tokenCookieConfigLocalhost = {
    expires: new Date(Date.now() + (30 * 24 * 60 * 60 * 1000)),
    httpOnly: true,
    path: "/"
}

/*
        expires: new Date(Date.now() + (30 * 24 * 60 * 60 * 1000)),
        httpOnly: true,
        sameSite: 'none',
        secure: "auto",
        path: "/"
 */

module.exports = {tokenCookieConfig, tokenCookieConfigLocalhost };