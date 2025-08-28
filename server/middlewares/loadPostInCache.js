const {postcache} = require('../utils/createCache')
const asyncHandler = require('../utils/asyncHandler')
const Post = require('../models/Post')

const loadPostInCache = asyncHandler(async (req, res, next) => {
    const posts = (await Post.find()).filter(post => post.createdAt > new Date(Date.now() - 24 * 60 * 60 * 1000))
    posts.map(post => postcache.set(post._id, {value: post, ttl: 10*60*1000}))
    next()
} )

module.exports = loadPostInCache