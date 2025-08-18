
const createCache = (cacheName) => {
    try {
        const store = new Map()
        setInterval(() => {
            const currentTime = Date.now()
            for(const [key, { ttl }] of store.entries()) {
                if (currentTime > ttl) {
                     store.delete(key.toString())
                    console.log(`Expired ${key.toString()} in ${cacheName}`)
                }
            }
        }, 60 * 1000);
        return {
            cacheName,
            has(key) {
                return store.has(key.toString())
            },

            get(key) {
                if (!store.has(key.toString())) return null
                const { data, ttl } = store.get(key.toString())
                if (Date.now() > ttl) {
                    store.delete(key.toString())
                    return null
                }
                return data
            },
            set(key, { value, ttl }) {
                store.set(key.toString(), { data: value, ttl: Date.now() + ttl })
                return value
            },
            delete(key) {
                if (!store.has(key.toString())) return null
                store.delete(key.toString())
            },
            clear() {
                console.warn(`Clearing ${cacheName}`);
                store.clear()
            },
            size() {
                return store.size
            },
            getAll() {
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