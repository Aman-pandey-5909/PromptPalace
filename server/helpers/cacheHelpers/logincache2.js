const { loginCache } = require("../../utils/tempCache");

module.exports = {
    delLogin: (token) => loginCache.delete(token),
    getLogin: (token) => loginCache.get(token),
    setLogin: (token, data) => loginCache.set(token, data),
    hasLogin: (token) => loginCache.has(token),
    getAllLogin: () => [...loginCache.entries()]
}