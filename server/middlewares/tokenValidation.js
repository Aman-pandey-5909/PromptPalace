const { setLogin, delLogin, hasLogin, getLogin } = require('../helpers/cacheHelpers/loginCache')
const { getUser, setUser } = require('../helpers/cacheHelpers/userCache')
const jwt = require('jsonwebtoken')

/**
 * Reads a user from the tempJSONDATA/User.json file by the given token
 * @param {string} token - The token to search for
 * @returns {object} The user object if found, or undefined if not
 */
function readUser(token) {
    // const user = fs.readFileSync(path.join(__dirname, '../../tempJSONDATA/User.json'), 'utf-8')
    // const users = JSON.parse(user)
    // const existingUser = users.find(user => user.token === token)
    const existingUser = getUser(token)
    if (!existingUser.data) {
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
    setLogin(token, newExpiry);
    res.cookie('userData', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
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

        if (hasLogin(token)) {
            // console.log("userDataCookie but no tempUserDataCookie in tokenValidate", userDataCookie);
            const expirationTime = getLogin(token)
            if (Date.now() < expirationTime.data) {
                console.log("Inside If block in userData but no tempUserDataCookie in tokenValidate");
                refreshToken(token, res)
                const existingUser = readUser(token)
                if (existingUser) {
                    req.user = existingUser
                    res.cookie('tempUserData', token, {
                        httpOnly: true,
                        secure: process.env.NODE_ENV === 'production',
                        sameSite: 'lax',
                        maxAge: 10 * 60 * 1000
                    })
                    return next()
                } else {
                    const dataFromCookie = jwt.verify(token, process.env.JWT_SECRET)
                    const { id, email, username } = dataFromCookie
                    const user = { id, email, username }
                    setUser(token, user)
                    req.user = user
                    res.cookie('tempUserData', token, {
                        httpOnly: true,
                        secure: process.env.NODE_ENV === 'production',
                        sameSite: 'lax',
                        maxAge: 10 * 60 * 1000
                    })
                    return next()
                }
            } else {
                delLogin(token)
                return res.status(401).json({ message: 'Unauthorized' });
            }
        }
    }

    if (!userDataCookie && tempUserDataCookie) {
        const token = tempUserDataCookie
        try {
            if (hasLogin(token)) {
                const expirationTime = getLogin(token)
                if ( Date.now() < expirationTime.data) {
                    refreshToken(token, res)
                    const existingUser = readUser(token)
                    if (existingUser) {
                        req.user = existingUser
                        return next()
                    } else {
                        const dataFromCookie = jwt.verify(token, process.env.JWT_SECRET)
                        const { id, email, username } = dataFromCookie
                        const user = { id, email, username }
                        setUser(token, user)
                        req.user = user
                        return next()
                    }
                } else {
                    delLogin(token)
                    return res.status(401).json({ message: 'Unauthorized' });
                }
            }
        } catch (error) {
            res.clearCookie('tempUserData')
            return res.status(401).json({ message: 'Unauthorized' });
        }
    }
    // console.log("error came from tokenValidate?");
    return res.status(200).json({ message: 'Authorized' }); // Ye nahi hone ke karan request yahi hang kar jaarha tha, no return no nothing causing the bug  of frontend restrcitedroutes not loading even after login, also return or next() a middleware, always use console logs for ease of debugging

}

module.exports = tokenValidate