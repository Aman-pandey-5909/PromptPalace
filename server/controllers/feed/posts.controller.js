const fs = require('fs')
const path = require('path')

exports.posts = async (req, res) => {
    try {
        const queries = req.query
        const postsfromfile = fs.readFileSync(path.join(__dirname, '../../tempJSONDATA/Posts.json'), 'utf-8')
        return res.status(200).json(JSON.parse(postsfromfile))
    } catch (error) {
        console.log(error)
    }
}