const User = require('../../../../models/User')
// const {escapeMongoKeys} = require('../../utils/escapeKeys')
const createUser = async(data) => {
    try {
        if (!data) {
            throw new Error('❌ -Please provide data to createUser')
        } 
        // const escapedData = escapeMongoKeys(data)
        const user = await User.create(data)
        console.log("✅ - User created successfully | dbHelpers");
        return {
            success: true,
            data: user
        }
    } catch (error) {
        console.error("❌ - Error creating user | dbHelpers", error);
        return {
            success: false,
            error: error.message
        }
    }
}

module.exports = createUser