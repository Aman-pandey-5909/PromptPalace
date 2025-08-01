const User = require('../../models/User')
// const {escapeMongoKey} = require('../../utils/escapeKeys')
const checkUser = async (email) => {
    try {
        if (!email) {
            throw new Error('❌ -Please provide an emailto checkUser') 
        }
        email = email.toLowerCase()
        // email = escapeMongoKey(email)
        const user = await User.findOne({ email })
        if (user) {
            return true
        }
        return false
    } catch (error) {
        console.error("❌-Error checking user | dbHelpers", error);
        return false
    }
}

module.exports = checkUser