const mongoose = require('mongoose')

async function mongoConnect ( mongo_uri) {
    try {
        await mongoose.connect(mongo_uri)
        console.log('✅ - Connected to MongoDB | db.js')
    } catch (error) {
        console.error('❌ - Error connecting to MongoDB | db.js', error)
    }
}

module.exports = mongoConnect