const { userDataCache } = require('../../utils/tempCache')

module.exports = {
    getUser: (token) => userDataCache.get(token),
    delUser: (token) => userDataCache.delete(token),
    hasUser: (token) => userDataCache.has(token),
    setUser: (token, data) => userDataCache.set(token, data),
    getAllUser: () => [...userDataCache.entries()]
}