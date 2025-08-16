const { postCache } = require('../../utils/tempCache')

module.exports = {
    getPost: (key) => postCache.get(key),
    setPost: (key, {value, ttl}) => postCache.set(key, {value: value, ttl: Date.now() + ttl}),
    deletePost: (key) => postCache.delete(key),
    hasPost: (key) => postCache.has(key),
    clearPost: () => postCache.clear(),
    getAllPost: () => [...postCache.entries()]
}