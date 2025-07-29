const { loginCache, userDataCache } = require("../utils/tempCache");


/**
 * Reads a user from the tempJSONDATA/User.json file by the given token
 * @param {string} token - The token to search for
 * @returns {object} The user object if found, or undefined if not
 */
function readUser(token) {
    // const user = fs.readFileSync(path.join(__dirname, '../../tempJSONDATA/User.json'), 'utf-8')
    // const users = JSON.parse(user)
    // const existingUser = users.find(user => user.token === token)
    const existingUser = userDataCache.get(token)
    if (!existingUser) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    return existingUser
}


/**
 * Refreshes a user's token, updates the cache, and sets a new cookie on the response
 * @param {string} token - The token to refresh
 * @param {object} res - The express response object
 * @returns {void}
 */
function refreshToken(token, res) {
    const newExpiry = Date.now() + 24 * 60 * 60 * 1000;
    loginCache.delete(token);
    loginCache.set(token, newExpiry);
    res.cookie('userData', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: 24 * 60 * 60 * 1000
    });
}


/**
 * Middleware to validate the user token and refresh it if valid
 * @param {object} req - The express request object
 * @param {object} res - The express response object
 * @param {function} next - The next middleware function
 * @returns {Promise<void>}
 */

async function tokenValidate(req, res, next) {
    const userDataCookie = req.cookies.userData
    const tempUserDataCookie = req.cookies.tempUserData

    if (!userDataCookie && !tempUserDataCookie) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    if (userDataCookie && !tempUserDataCookie) {
        const token = userDataCookie

        if (loginCache.has(token)) {
            const expirationTime = loginCache.get(token)
            if (Date.now() < expirationTime) {
                refreshToken(token, res)
                const existingUser = readUser(token)
                if (existingUser) {
                    req.user = existingUser
                    return next()
                } else {
                    return res.status(401).json({ message: 'Unauthorized' });
                }
            } else {
                loginCache.delete(token)
                return res.status(401).json({ message: 'Unauthorized' });
            }
        }
    }

    if (!userDataCookie && tempUserDataCookie) {
        const token = tempUserDataCookie
        try {
            if (loginCache.has(token)) {
                const expirationTime = loginCache.get(token)
                if ( Date.now() < expirationTime) {
                    refreshToken(token, res)
                    const existingUser = readUser(token)
                    if (existingUser) {
                        req.user = existingUser
                        return next()
                    } else {
                        return res.status(401).json({ message: 'Unauthorized' });
                    }
                } else {
                    loginCache.delete(token)
                    return res.status(401).json({ message: 'Unauthorized' });
                }
            }
        } catch (error) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
    }

}

module.exports = tokenValidate