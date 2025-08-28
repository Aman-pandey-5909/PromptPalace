const asyncHandler = require('../../utils/asyncHandler')
const Post = require('../../models/Post')

exports.userposts = asyncHandler(async (req, res) => {
    console.log(req.user._id);
    const posts = await Post.find({author: req.user._id}).populate('author')
    return res.status(200).json({message: 'User posts fetched', data: posts})
})