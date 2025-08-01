const User = require('../models/User')

const deleteUser = async(id) => {
    try {
        if (!id) {
            throw new Error('❌ -Please provide an id to deleteUser')
        }
        const user = await User.findOneAndDelete({ id: id })
        console.log("✅ - User deleted successfully | dbHelpers");
        return {
            success: true,
            data: user
        }
    } catch (error) {
        console.error("❌ - Error deleting user | dbHelpers", error);
        return {
            success: false,
            error: error.message
        }
    }
}

module.exports = deleteUser