const User = require('../../models/User')
const { setUser } = require('../cacheHelpers/userCache')
// const {escapeMongoKeys} = require('../../utils/escapeKeys')
const editUser = async(id, data) => {
    try {
        if (!id) {
            throw new Error('❌ -Please provide an id to editUser')
        }
        if (!data) {
            throw new Error('❌ -Please provide data to editUser')
        }
        // const newData = escapeMongoKeys(data)
        const user = await User.findOneAndUpdate({ id: id }, data, { new: true })
        setUser(user.token, { id: user.id, email: user.email, username: user.username })
        console.log("✅ - User edited successfully | dbHelpers");
        return {
            success: true,
            data: user
        }
    } catch (error) {
        console.error("❌ - Error editing user | dbHelpers", error);
        return {
            success: false,
            error: error.message
        }
    }
}

module.exports = editUser