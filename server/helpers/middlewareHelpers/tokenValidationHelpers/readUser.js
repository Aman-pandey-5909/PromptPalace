// const { getUser } = require('../../cacheHelpers/userCache')
const { getUser } = require('../../cacheHelpers/userCache2')

function readUser (token) {
    try {
        if (!token) {
            throw new Error('❌ -Please provide a token to readUser')
        }
        const user = getUser(token)
        // console.log("user in tokenValidationHelpers/readUser", user); 
        if (!user) {
            return false
        }
        console.log("✅ - User read successfully | readUser");
        return user
    } catch (error) {
        console.error("❌ - Error validating token | readUser", error);
        return false
    }
}

module.exports = readUser