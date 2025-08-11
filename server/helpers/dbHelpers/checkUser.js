const User = require('../../models/User')
// const {escapeMongoKey} = require('../../utils/escapeKeys')
const checkUser = async (data) => {
    try {
        if (!data) {
            throw new Error('❌ -Please provide an data to checkUser') 
        }
        return await User.exists(data)
    } catch (error) {
        console.error("❌-Error checking user | dbHelpers", error);
        return false
    }
}

module.exports = checkUser