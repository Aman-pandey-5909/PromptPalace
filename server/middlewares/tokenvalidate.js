// remake token validation, this time implement file saving and shii
const jwt = require('jsonwebtoken')
// const _ = require('lodash')
const refreshToken = require('../helpers/middlewareHelpers/tokenValidationHelpers/refreshToken')
const readUser = require('../helpers/middlewareHelpers/tokenValidationHelpers/readUser')

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
        const user = readUser(token)
        if (!user.success) {
            throw new Error(`❌ - ${user.error} | Authorization Failed`)
        }
        
        const decodedData = {
            _id: decoded._id,
            email: decoded.email,
            username: decoded.username
        }
        // console.log("User data in tokenvalidate:", user.data.data);
        // console.log("Decoded data in tokenvalidate:", decodedData);
        console.log("User _id from userdata in tokenvalidate:", user.data.data._id.toString());
        if (user.data.data.email !== decodedData.email || user.data.data.username !== decodedData.username || user.data.data._id.toString() !== decodedData._id) {
            throw new Error('❌ - User does not match token | Authorization Failed')
        }
        req.user = user.data.data
        next()
    } catch (error) {
        console.error("❌ - Error validating token | tokenvalidation", error);
        res.status(401).json({ message: 'Unauthorized | Authorization Failed' });
    }
}

module.exports = tokenvalidation