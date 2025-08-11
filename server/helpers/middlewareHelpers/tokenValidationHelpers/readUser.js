const { getUser } = require('../../cacheHelpers/userCache')

function readUser (token) {
    try {
        if (!token) {
            throw new Error('❌ -Please provide a token to readUser')
        }
        const user = getUser(token)
        // console.log("user in tokenValidationHelpers/readUser", user);  
        return {
            success: true,
            data: user
        }
    } catch (error) {
        console.error("❌ - Error validating token | readUser", error);
        return {
            success: false,
            error: error.message
        }
    }
}

module.exports = readUser