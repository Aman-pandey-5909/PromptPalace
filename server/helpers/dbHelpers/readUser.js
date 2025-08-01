const User = require('../../models/User')

const readUser = async(id) => {
    try {
        if (!id) {
            throw new Error('❌ -Please provide an id to readUser')
        }
        const user = await User.findOne({ id: id })
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