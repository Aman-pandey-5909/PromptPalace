const User = require('../../../../models/User')

const dropUser = async() => {
    try {
        await User.deleteMany({})
        console.warn("✅ - User Doc dropped successfully | dbHelpers")
        return {
            success: true
        }
    } catch (error) {
        console.error("❌ - Error dropping user | dbHelpers", error);
        return { 
            success: false,
            error: error.message
        }
    }
}

module.exports = dropUser