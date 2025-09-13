const asyncHandler = require('../../utils/asyncHandler')
const Post = require('../../models/Post')
const { usercache } = require('../../utils/createCache')

exports.userposts = asyncHandler(async (req, res) => {
    const query = req.query
    console.log("query", query);
    const posts = await Post.find({author: query.id}).populate('author')
    // console.log(posts);
    return res.status(200).json({message: 'User posts fetched', data: posts})
})