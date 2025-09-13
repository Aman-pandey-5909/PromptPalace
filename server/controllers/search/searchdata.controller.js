const asyncHandler = require('../../utils/asyncHandler');
const Post = require('../../models/Post');

exports.searchdata = asyncHandler(async (req, res) => {
    const query = req.query
    const posts = await Post.find({ $text: { $search: query.q } }, {score: {$meta: "textScore"}}).populate('author').sort({score: {$meta: "textScore"}})
    // console.log(posts);
    res.status(200).json({message: 'Post fetched', data: posts})
});