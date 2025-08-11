const User = require('../../models/User')

const readUser = async(data) => {
    try {
        if (!data) {
            throw new Error('❌ -Please provide an id to readUser')
        }
        const user = await User.findOne(data)
        if (!user) {
            return {
                success: false,
                error: "User not found"
            }
        }
        console.log("✅ - User read successfully | dbHelpers");
        return {
            success: true,
            data: user
        }
    } catch (error) {
        console.error("❌ - Error reading user | dbHelpers", error);
        return {
            success: false,
            error: error.message
        }
    }
}

module.exports = readUser