const User = require('../../../models/User')
const {setUser} = require('../../cacheHelpers/userCache2')

module.exports = {
    checkUser: async(data) => await User.exists(data),
    createUser: async(data) => await User.create(data),
    readUser: async(data) => await User.findOne(data),
    editUser: async(searchIn, searchFor, data) => {
        const user = await User.findOneAndUpdate({ [searchIn]: searchFor }, data, { new: true })
        setUser(user.token, user)
        return user
    }, 
    delUser: async(data) => await User.deleteOne(data),
    dropUser: async() => await User.deleteMany({})
} 