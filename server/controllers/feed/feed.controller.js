const fs = require('fs')
const path = require('path')
const asyncHandler = require('../../utils/asyncHandler')
const Post = require('../../models/Post')
const {postcache} = require('../../utils/createCache')

exports.feed = asyncHandler(async (req, res) => {
    const queries = req.query
    // const postsfromfile = 
    
    // const posts = postcache.getAll()
    const posts = await Post.find().populate('author')

    return res.status(200).json({message: 'Feed fetched', data: posts})
})