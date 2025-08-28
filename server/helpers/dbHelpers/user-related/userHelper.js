const User = require('../../../models/User')
const { usercache } = require('../../../utils/createCache')


module.exports = {
    checkUser: async (data) => await User.exists(data),
    createUser: async (data) => await User.create(data),
    readUser: async (data) => await User.findOne(data),
    editUser: async (searchIn, searchFor, data) => {
        const user = await User.findOneAndUpdate({ [searchIn]: searchFor }, data, { new: true })

        // setUser(user.token, user)
        // console.log(`user._id in editUser before set: `, user._id);
        usercache.set(user._id, { value: user, ttl: 24 * 60 * 60 * 1000 })
        // console.log(`usercache in userHelper : ${JSON.stringify(usercache.getAll(), null, 2)}`);

        return user
    },
    delUser: async (data) => await User.deleteOne(data),
    dropUser: async () => await User.deleteMany({})
} 