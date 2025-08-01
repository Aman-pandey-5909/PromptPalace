const mongoConnect = require('../libs/db')
module.exports = async (mongo_uri) => {
    await mongoConnect(mongo_uri)
}