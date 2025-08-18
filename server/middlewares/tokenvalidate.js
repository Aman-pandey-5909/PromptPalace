// remake token validation, this time implement file saving and shii
const jwt = require('jsonwebtoken')
// const _ = require('lodash')
const refreshToken = require('../helpers/middlewareHelpers/tokenValidationHelpers/refreshToken')
const readUser = require('../helpers/middlewareHelpers/tokenValidationHelpers/readUser')
const {usercache} = require('../utils/createCache')

async function tokenvalidation (req, res, next) {
    try {
        console.log("Reached tokenvalidation");
        const token = req.cookies.userData
        if (!token) {
            throw new Error('❌ - Please provide a token to tokenvalidation | Authorization Failed')
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        
        const refreshtoken  = refreshToken(res, token)
        if (!refreshtoken.status) {
            throw new Error(`❌ - ${refreshtoken.message} | Authorization Failed`)
        }

        // const user = readUser(token)
        // console.log(`decoded._id in tokenvalidation: `, decoded._id);
        const user = readUser(decoded._id)
        // console.log(`usercache in tokenvalidation: ${JSON.stringify(usercache.getAll(), null, 2)}`);

        if (!user) {
            throw new Error(`❌ - user: ${user} | Authorization Failed`)
        }
        
        const decodedData = {
            _id: decoded._id,
            email: decoded.email,
            username: decoded.username
        }
        // console.log("User data in tokenvalidate:", user.data.data);
        // console.log("Decoded data in tokenvalidate:", decodedData);
        // console.log("User _id from userdata in tokenvalidate:", user._id.toString());
        if (user.email !== decodedData.email || user.username !== decodedData.username || user._id.toString() !== decodedData._id) {
            throw new Error('❌ - User does not match token | Authorization Failed')
        }
        req.user = user
        next()
    } catch (error) {
        res.clearCookie('userData')
        console.error("❌ - Error validating token | tokenvalidation", error);
        res.status(401).json({ message: 'Unauthorized | Authorization Failed' });
    }
}

module.exports = tokenvalidation 