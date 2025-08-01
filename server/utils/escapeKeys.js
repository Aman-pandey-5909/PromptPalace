const ESCAPE_MONGO = {
    '$': '\\$',
    '.': '\\.',
    '(': '\\(',
    ')': '\\)',
    '*': '\\*',
    '+': '\\+',
    '?': '\\?',
    '|': '\\|',
    '\\': '\\\\'
}

function escapeMongoKey(key) {
    return key.replace(/[$.()*+?|\\]/g, char => ESCAPE_MONGO[char]);
}

function escapeMongoKeys(obj) {
    if (Array.isArray(obj)) {
        return obj.map(escapeMongoKeys);
    } else if (obj !== null && typeof obj === 'object') {
        return Object.entries(obj).reduce((acc, [key, value]) => {
            const escapedKey = escapeMongoKey(key);
            acc[escapedKey] = escapeMongoKeys(value);
            return acc;
        }, {});
    } else {
        return obj;
    }
}

module.exports = { escapeMongoKey, escapeMongoKeys };