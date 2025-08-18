// const { getUser } = require('../../cacheHelpers/userCache')
const { getUser } = require('../../cacheHelpers/userCache2')
const {usercache} = require('../../../utils/createCache')

function readUser (userid) {
    try {
        if (!userid) {
            throw new Error('❌ -Please provide a token to readUser')
        }

        // const user = getUser(token)
        // console.log(`userid in readUser before get: `, userid);
        const user = usercache.get(userid)
        // console.log(`usercache in readUser in middleware helper: ${JSON.stringify(usercache.getAll(), null, 2)}`);


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