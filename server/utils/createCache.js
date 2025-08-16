
const createCache = (cacheName) => {
    try {
        const store = new Map()
        setInterval(() => {
            const currentTime = Date.now()
            for(const [key, { ttl }] of store.entries()) {
                if (currentTime > ttl) {
                     store.delete(key)
                    console.log(`Expired ${key} in ${cacheName}`)
                }
            }
        }, 60 * 1000);
        return {
            cacheName,
            async has(key) {
                return store.has(key)
            },

            async get(key) {
                if (!store.has(key)) return null
                const { data, ttl } = store.get(key)
                if (Date.now() > ttl) {
                    store.delete(key)
                    return null
                }
                return data
            },
            async set(key, { value, ttl }) {
                store.set(key, { data: value, ttl: Date.now() + ttl })
                return value
            },
            async delete(key) {
                if (!store.has(key)) return null
                store.delete(key)
            },
            async clear() {
                console.warn(`Clearing ${cacheName}`);
                store.clear()
            },
            async size() {
                return store.size
            },
            async getAll() {
                return [...store]
            }
        }
    } catch (error) {
        console.error(error)
    }
}

const logincache = createCache('Login Cache')
const usercache = createCache('User Cache')
const postcache = createCache('Post Cache')

module.exports = {
    logincache,
    usercache,
    postcache,
    createCache
}