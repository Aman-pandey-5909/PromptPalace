const loginCache = new Map()
const userDataCache = new Map()

setInterval(() => {
    const now = Date.now();
    for (const [token, expiry] of loginCache.entries()) {
        if (now >= expiry) {
            loginCache.delete(token);
            console.log(`Token ${token} expired`);
        }
    }
}, 10 * 60 * 1000); 

module.exports = { loginCache, userDataCache }