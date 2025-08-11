const {setLogin, hasLogin} = require('../../cacheHelpers/loginCache')
const setCookie = require('./setCookie')
const readUser = require('./readUser')
const jwt = require('jsonwebtoken')
const _ = require('lodash')
function refreshToken (res, token) {
    try {
        if (!token) {
            throw new Error('❌ -Please provide a token to refreshToken')
        }

        if (!res) {
            throw new Error('❌ -Please provide a response object to refreshToken')
        }
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const decodedData = {
            _id: decoded._id,
            email: decoded.email,
            username: decoded.username
        }

        if (hasLogin(token)) {
            const newExpiry = Date.now() + 24 * 60 * 60 * 1000;
            setLogin(token, newExpiry);
            const options = {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                maxAge: newExpiry
            }
            setCookie(res, 'userData', token, options)
            return {
                status: true,
                message: "Token refreshed successfully"
            }
        } else {
            const user = readUser(token)
            if(
                user.data.data.email !== decodedData.email ||
                user.data.data.username !== decodedData.username ||
                user.data.data._id.toString() !== decodedData._id
            ) {
                res.clearCookie('userData')
                throw new Error('❌ - User does not match token | refreshToken')
            }
            setLogin(token, Date.now() + 24 * 60 * 60 * 1000);
            const options = {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                maxAge: 24 * 60 * 60 * 1000
            }
            setCookie(res, 'userData', token, options)
            return {
                status: true,
                message: "Token refreshed successfully"
            }
        }
    } catch (error) {
        console.error("Error in helpers/refreshToken", error);
        return {
            status: false,
            message: error.message
        }
    }
}

module.exports = refreshToken